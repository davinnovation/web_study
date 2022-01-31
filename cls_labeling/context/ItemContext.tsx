// https://react.vlpt.us/using-typescript/04-ts-context.html
import { Dispatch, useContext, useReducer } from "react";
import { createContext } from "react"

type ProjectState = {
  project_id: string;
}

type ProjectAction = 
  | { type: 'SET_ID'; project_id: string };

type ProjectDispatch = Dispatch<ProjectAction>;

const ProjectStateContext = createContext<ProjectState | null>(null);
const ProjectDispatchContext = createContext<ProjectDispatch | null>(null);

function project_reducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        project_id: action.project_id
      }
  }
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(project_reducer, {'project_id' : "None"});

  return (
    <ProjectStateContext.Provider value={state}>
      <ProjectDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectStateContext.Provider>
  );
}

export function getProjectState() {
  const state = useContext(ProjectStateContext);
  if (!state) throw new Error('Cannot find ProjectStateContext');
  return state
}

type LabelItemState = {
  item_id: string,
  label: Array<number>
}

type LabelItemAction = 
  | { type: 'SET_ID'; item_id: string }
  | { type: 'ADD_LABEL'; label: number}
  | { type: 'REMOVE_LABEL'; label: number};

type LabelItemDispatch = Dispatch<LabelItemAction>;

const LabelItemStateContext = createContext<LabelItemState | null>(null);
const LabelItemDispatchContext = createContext<LabelItemDispatch | null>(null);

function labelitem_reducer(state: LabelItemState, action: LabelItemAction): LabelItemState {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        item_id: action.item_id
      }
    case 'ADD_LABEL':
      state.label.push(action.label)
      return state;
    case 'REMOVE_LABEL':
      state.label.forEach( (item, index) => {
        if(item == action.label) state.label.splice(index, 1);
      })
      return state;
  }
}

export function LabelItemProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(labelitem_reducer, {'item_id':"None", 'label': []});

  return (
    <LabelItemStateContext.Provider value={state}>
      <LabelItemDispatchContext.Provider value={dispatch}>
        {children}
      </LabelItemDispatchContext.Provider>
    </LabelItemStateContext.Provider>
  );
}
export function LabelItemState() {
  const state = useContext(LabelItemStateContext);
  if (!state) throw new Error('Cannot find LabelItemStateContext');
  return state
}