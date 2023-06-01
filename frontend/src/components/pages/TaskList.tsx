import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { tButton, tCustomConfirm, tListHeaderActionDropDowns } from '../../app/general/types';
import { tTaskQueryParts } from '../../app/task/taskTypes';
import { getTasks } from '../../app/task/taskThunks';
import {
  taskBuildURL,
  taskRefreshPage,
  taskToogleEditor,
  taskToogleHighlighted,
  taskUpdateQueryParts,
} from '../../app/task/taskSlice';
import {
  taskInitialState,
  taskListCompletion,
  taskListLimit,
  taskListSearchType,
  taskListSort,
} from '../../app/task/taskInitialStates';
import { formatDate } from '../../app/general/middlewares';
import { AiOutlineRightCircle } from 'react-icons/ai';
import DefaultLayout from '../layout/DefaultLayout';
import Paginator from '../list/Paginator';
import TaskEditorPopup from '../task/TaskEditorPopup';
import RefreshButton from '../general/ButtonRefresh';
import ListHeaderTitle from '../list/ListHeaderTitle';
import ListHeader from '../list/ListHeader';
import DropDownMenu from '../general/DropDownMenu';
import DropDownListLabel from '../general/DropDownListLabel';
import ListBody from '../list/ListBody';
import ListBodyEmpty from '../list/ListBodyEmpty';
import TaskListElement from '../task/TaskListElement';

type tSearch = {
  keywords: tTaskQueryParts['keywords'];
  searchType: tTaskQueryParts['searchType'];
};

const TaskList: React.FC = () => {
  useEffect(() => {
    // set page title to selected collection name
    document.title = 'Tasks';
  }, []);

  // check user is logged in
  useCheckLoggedIn(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useAppSelector((state) => state.tasks);

  const [search, setSearch] = useState<tSearch>({
    keywords: taskInitialState.queryParts.keywords,
    searchType: taskInitialState.queryParts.searchType,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<undefined | tCustomConfirm>(undefined);

  const updateTaskQuery = (
    queryPart: keyof tTaskQueryParts,
    value: string,
    refresh: boolean = true,
  ) => {
    dispatch(
      taskUpdateQueryParts({
        queryPart: queryPart,
        value: value,
        refreshPage: refresh,
      }),
    );
  };

  const listHeaderActionButtons: tButton[] = [
    { text: 'Add a new task', action: () => dispatch(taskToogleEditor(true)) },
  ];
  if (tasks.resetSearch) {
    listHeaderActionButtons.push({
      text: 'Reset search',
      action: () => {
        updateTaskQuery('keywords', taskInitialState.queryParts.keywords, false);
        updateTaskQuery('searchType', taskInitialState.queryParts.searchType);
      },
    });
  }

  const listHeaderActionDropDowns: tListHeaderActionDropDowns = [
    {
      triggerText: taskListCompletion[tasks.queryParts.completion],
      ignoredOption: tasks.queryParts.completion,
      options: taskListCompletion,
      action: (value) => updateTaskQuery('completion', value as string),
    },
    {
      triggerText: taskListSort[tasks.queryParts.sort],
      ignoredOption: tasks.queryParts.sort,
      options: taskListSort,
      action: (value) => updateTaskQuery('sort', value as string),
    },
    {
      triggerText: taskListLimit[tasks.queryParts.limit],
      ignoredOption: tasks.queryParts.limit,
      options: taskListLimit,
      action: (value) => updateTaskQuery('limit', value as string),
    },
  ];

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // if page refreshing has been triggered then it requests data from backend
    if (tasks.refreshPage) {
      // waits for a while to create query string in URL
      timerId = setTimeout(
        () => dispatch(getTasks(params.collection_id + window.location.search)),
        150,
      );
    }
    // if redirect occurs because of JWT missing, then cancel dispatch
    return () => clearTimeout(timerId);
  }, [dispatch, tasks.refreshPage, params.collection_id]);

  useEffect(() => {
    // cease highlighting of element
    if (tasks.highlighted !== false) {
      setTimeout(() => dispatch(taskToogleHighlighted(false)), 1500);
    }
  }, [dispatch, tasks.highlighted]);

  useEffect(() => {
    if (tasks.status !== 'loading') {
      if (tasks.collection === null) {
        if (tasks.status === 'idle') {
          // trigger to request first data from backend
          dispatch(taskRefreshPage());
        } else {
          // return to collections because the collection cannot be found
          navigate('/');
        }
      } else {
        // rebuild url for browser by returned and valid filter values
        dispatch(taskBuildURL());
        // update search fields with response data
        setSearch({
          keywords: tasks.queryParts.keywords,
          searchType: tasks.queryParts.searchType,
        });
      }
    }
  }, [dispatch, navigate, tasks.collection, tasks.queryParts, tasks.status]);

  return (
    <DefaultLayout loading={tasks.status === 'loading'} customConfirm={deleteConfirm}>
      <>
        {params.collection_id && tasks.editor !== false && (
          <TaskEditorPopup
            task={!tasks.data || tasks.editor === true ? false : tasks.data[tasks.editor]}
            collection_id={params.collection_id}
          />
        )}
        {tasks.refreshButton && <RefreshButton action={() => dispatch(taskRefreshPage())} />}
        <ListHeaderTitle
          backLabel="Back to collections"
          label={
            tasks.collection
              ? `${formatDate(tasks.collection.createdAt)} - ${tasks.collection.name}`
              : 'Please wait...'
          }
        />
        <ListHeader
          search={search}
          setSearch={setSearch}
          action={() => {
            updateTaskQuery('keywords', search.keywords, false);
            updateTaskQuery('searchType', search.searchType);
          }}
          searchType={
            <DropDownMenu
              wrapperClass="list-drop-down-wrapper"
              listClass="list-drop-down-menu"
              optionClass="icon-wrapper click"
              trigger={<DropDownListLabel text={taskListSearchType[search.searchType]} />}
              ignoredOption={search.searchType}
              options={taskListSearchType}
              action={(value) =>
                setSearch({
                  ...search,
                  searchType: value,
                })
              }
              optionIcon={<AiOutlineRightCircle className="icon" />}
            />
          }
          listHeaderActionButtons={listHeaderActionButtons}
          listHeaderActionDropDowns={listHeaderActionDropDowns}
        />
        {tasks.data && tasks.data.length ? (
          <ListBody
            paginator={
              <Paginator
                page={tasks.queryParts.page}
                isNextPage={tasks.isNextPage}
                refreshPage={tasks.refreshPage}
                selectAction={(value) => updateTaskQuery('page', value as string)}
              />
            }
            children={tasks.data.map((task, index) => (
              <TaskListElement
                key={task._id}
                index={index}
                task={task}
                highlighted={tasks.highlighted}
                setDeleteConfirm={setDeleteConfirm}
              />
            ))}
          />
        ) : (
          <ListBodyEmpty text="No task found" />
        )}
      </>
    </DefaultLayout>
  );
};

export default TaskList;
