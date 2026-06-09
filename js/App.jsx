import { useState } from "react";
import { LS } from "./utils.js";
import JoinScreen  from "./components/JoinScreen.jsx";
import ListsView   from "./components/ListsView.jsx";
import ListDetail  from "./components/ListDetail.jsx";
import HistoryView from "./components/HistoryView.jsx";

const VIEWS = { LISTS: "lists", DETAIL: "detail", HISTORY: "history" };

export default function App() {
  const [session,    setSession]    = useState(() => LS.get("fc_session", null));
  const [view,       setView]       = useState(VIEWS.LISTS);
  const [activeList, setActiveList] = useState(null);

  function openList(list) {
    setActiveList(list);
    setView(VIEWS.DETAIL);
  }

  function closeList() {
    setActiveList(null);
    setView(VIEWS.LISTS);
  }

  function handleJoin(sessionData) {
    LS.set("fc_session", sessionData);
    setSession(sessionData);
  }

  function handleLeave() {
    LS.set("fc_session", null);
    setSession(null);
  }

  if (!session) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  if (view === VIEWS.DETAIL && activeList) {
    return <ListDetail list={activeList} session={session} onBack={closeList} />;
  }

  if (view === VIEWS.HISTORY) {
    return <HistoryView session={session} onBack={() => setView(VIEWS.LISTS)} />;
  }

  return (
    <ListsView
      session={session}
      onOpen={openList}
      onHistory={() => setView(VIEWS.HISTORY)}
      onLeave={handleLeave}
    />
  );
}
