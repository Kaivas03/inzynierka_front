import { Edge, Node, XYPosition } from "reactflow";
import { nanoid } from "nanoid/non-secure";

import { NodeData } from "./MindMapNode";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import {
  createPostRequest,
  createUrl,
  deleteRequestTemplate,
  fetchW,
  getRequestTemplate,
} from "../../utils/fetchUtils";
import {
  notifyError,
  notifySuccess,
} from "../../common/notifycations/notifycationsSlice";
import {
  fetchHypothesisList,
  fetchQuestionsList,
  setNodeMoved,
} from "../hypothesisSlice";

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
};

const initialState: RFState = {
  nodes: [],
  edges: [],
};

const mindMapSlice = createSlice({
  name: "mindMap",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node<NodeData>[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    setNodePackage: (state, action: PayloadAction<RFState>) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    makeNodePackageEmpty: (state) => {
      state.nodes = [];
      state.edges = [];
    },
  },
});

const { setNodePackage } = mindMapSlice.actions;
export const { setNodes, setEdges, makeNodePackageEmpty } =
  mindMapSlice.actions;

export const addChildNode =
  (id: string, text: string, position: XYPosition): AppThunk =>
  (dispatch, getState) => {
    const newNode = {
      id: nanoid(),
      type: "mindmap",
      data: { text: text },
      position,
    };

    const newEdge = {
      id: nanoid(),
      source: id,
      target: newNode.id,
    };

    dispatch(setNodes([...getState().mindMapReducer.nodes, newNode]));
    dispatch(setEdges([...getState().mindMapReducer.edges, newEdge]));
  };

export const fetchMindMap = (): AppThunk => async (dispatch, getState) => {
  const hypothesisId = getState().hypothesisReducer.currentHypothesisId;
  const url = createUrl(`/mind-map/${hypothesisId}`);
  const response = await fetchW(url, getRequestTemplate, dispatch);
  if (response.ok) {
    dispatch(setNodePackage(await response.json()));
    dispatch(fetchQuestionsList());
  } else {
    dispatch(setNodePackage({ nodes: [], edges: [] }));
    // dispatch(notifyError("Błąd podczas pobierania pytań."));
  }
};

export const createQuestion =
  (
    parendQuestionId: number,
    text: string,
    x: number,
    y: number,
    codes: number[],
    groups: number[]
  ): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/question/${parendQuestionId}`);
    const response = await fetchW(
      url,
      createPostRequest({
        text: text,
        posX: x,
        posY: y,
        codeIds: codes,
        codeGroupIds: groups,
      }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchMindMap());
    } else {
      dispatch(notifyError("Błąd podczas tworzenia pytania."));
    }
  };

export const editQuestion =
  (
    questionId: number,
    text: string | null,
    x: number,
    y: number,
    codes: number[],
    groups: number[]
  ): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/question/edit/${questionId}`);
    const response = await fetchW(
      url,
      createPostRequest({
        text: text,
        posX: x,
        posY: y,
        codeIds: codes,
        codeGroupIds: groups,
      }),
      dispatch
    );
    if (response.ok) {
      dispatch(fetchMindMap());
    } else {
      dispatch(notifyError("Błąd podczas edycji pytania."));
    }
  };

export const updatePositions = (): AppThunk => async (dispatch, getState) => {
  const hypothesisId = getState().hypothesisReducer.currentHypothesisId;
  const nodes = getState().mindMapReducer.nodes;
  const url = createUrl(`/mind-map/${hypothesisId}`);
  const response = await fetchW(
    url,
    createPostRequest({
      nodes,
    }),
    dispatch
  );
  if (response.ok) {
    dispatch(fetchQuestionsList());
    dispatch(setNodeMoved(false));
  } else {
    dispatch(notifyError("Błąd podczas aktualizacji pozycji."));
  }
};

export const deleteQuestion =
  (id: number): AppThunk =>
  async (dispatch) => {
    const url = createUrl(`/question/${id}`);
    const response = await fetchW(url, deleteRequestTemplate, dispatch);
    if (response.ok) {
      dispatch(fetchMindMap());
      dispatch(notifySuccess("Usunięto pytanie o id: " + id));
      dispatch(fetchHypothesisList());
    } else {
      dispatch(notifyError("Nie udało się usunąć pytania"));
    }
  };

export default mindMapSlice.reducer;
