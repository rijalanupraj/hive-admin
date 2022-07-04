import { useEffect } from "react";
// @mui
import { Container, Stack } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { getBoard, persistColumn, persistCard } from "../../redux/slices/kanban";
import { useSnackbar } from "notistack";

// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { SkeletonKanbanColumn } from "../../components/skeleton";
// sections
import { KanbanColumn, KanbanColumnAdd } from "../../sections/@dashboard/kanban";
import { useParams, useNavigate } from "react-router";

import {
  getBoardById,
  getAllBoardList,
  moveKanbanList,
  moveKanbanCard
} from "../../redux/actions/kanbanActions";

// ----------------------------------------------------------------------

export default function Kanban() {
  const dispatch = useDispatch();
  const kanban = useSelector(state => state.kanban);
  const { id } = useParams();
  const navigate = useNavigate();
  const enqueueSnackbar = useSnackbar();

  useEffect(() => {
    dispatch(getBoardById(id));
    dispatch(getAllBoardList(id));
  }, []);

  // If page is not found then redirect to dashboard
  if (kanban.isLoading) {
    return <div>Loading</div>;
  }

  if (!kanban.isLoading && !kanban.board) {
    navigate("/dashboard/kanban");
  }

  const onDragEnd = result => {
    // Reorder card
    const { destination, source, draggableId, type } = result;
    console.log(result);

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === "column") {
      let data = {
        toIndex: destination.index,
        boardId: id,
        listId: draggableId
      };
      dispatch(moveKanbanList(data, enqueueSnackbar));
      // const newColumnOrder = Array.from(kanban.boardList);
      // newColumnOrder.splice(source.index, 1);
      // newColumnOrder.splice(destination.index, 0, draggableId);
      // dispatch(persistColumn(newColumnOrder));
      return;
    }

    console.log(result);

    let dat = {
      fromId: source.droppableId,
      toId: destination.droppableId,
      toIndex: destination.index
    };

    dispatch(moveKanbanCard(draggableId, dat, enqueueSnackbar));

    // const start = board.columns[source.droppableId];
    // const finish = board.columns[destination.droppableId];

    // if (start.id === finish.id) {
    //   const updatedCardIds = [...start.cardIds];
    //   updatedCardIds.splice(source.index, 1);
    //   updatedCardIds.splice(destination.index, 0, draggableId);

    //   const updatedColumn = {
    //     ...start,
    //     cardIds: updatedCardIds
    //   };

    //   dispatch(
    //     persistCard({
    //       ...board.columns,
    //       [updatedColumn.id]: updatedColumn
    //     })
    //   );
    //   return;
    // }

    // const startCardIds = [...start.cardIds];
    // startCardIds.splice(source.index, 1);
    // const updatedStart = {
    //   ...start,
    //   cardIds: startCardIds
    // };

    // const finishCardIds = [...finish.cardIds];
    // finishCardIds.splice(destination.index, 0, draggableId);
    // const updatedFinish = {
    //   ...finish,
    //   cardIds: finishCardIds
    // };

    // dispatch(
    //   persistCard({
    //     ...board.columns,
    //     [updatedStart.id]: updatedStart,
    //     [updatedFinish.id]: updatedFinish
    //   })
    // );
  };

  return (
    <Page title='Kanban' sx={{ height: 1 }}>
      <Container maxWidth={false} sx={{ height: 1 }}>
        <HeaderBreadcrumbs
          heading='Kanban'
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root
            },
            { name: "Kanbans" }
          ]}
        />
        {/* <DragDropContext> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='all-columns' direction='horizontal' type='column'>
            {provided => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                direction='row'
                alignItems='flex-start'
                spacing={3}
                sx={{ height: "calc(100% - 32px)", overflowY: "hidden" }}
              >
                {/* {!board.columnOrder.length ? (
                  <SkeletonKanbanColumn />
                ) : (
                  .columnOrder.map((columnId, index) => (
                    <KanbanColumn index={index} key={columnId} column={board.columns[columnId]} />
                  ))
                )}

                {provided.placeholder} */}

                {!kanban.board ? (
                  <SkeletonKanbanColumn />
                ) : (
                  kanban.boardList.map((list, index) => (
                    <KanbanColumn index={index} key={list._id} column={list} boardId={id} />
                  ))
                )}

                {provided.placeholder}
                <KanbanColumnAdd boardId={id} />
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Page>
  );
}
