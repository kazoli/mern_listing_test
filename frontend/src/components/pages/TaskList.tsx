import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import { tButton, tListHeaderActionDropDowns } from '../../app/general/types';
import { tTaskQueryParts } from '../../app/task/taskTypes';
import { getTasks } from '../../app/task/taskThunks';
import {
  taskResetState,
  taskBuildURL,
  taskRefreshPage,
  taskToogleEditor,
  taskToogleHighlighted,
  taskUpdateQueryParts,
} from '../../app/task/taskSlice';
import {
  taskListCompletion,
  taskListLimit,
  taskListSearchType,
  taskListSort,
} from '../../app/task/taskInitialStates';
import { formatDate } from '../../app/general/middlewares';
import { AiOutlineExclamationCircle, AiOutlineRightCircle } from 'react-icons/ai';
import DefaultLayout from '../layout/DefaultLayout';
import Paginator from '../general/Paginator';
import TaskEditorPopup from '../task/TaskEditorPopup';
import RefreshButton from '../general/ButtonRefresh';
import ListHeaderTitle from '../list/ListHeaderTitle';
import ListHeader from '../list/ListHeader';
import DropDownMenu from '../general/DropDownMenu';
import DropDownListLabel from '../general/DropDownListLabel';
import Task from '../task/Task';

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
    keywords: '',
    searchType: 'default',
  });

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
        updateTaskQuery('keywords', '', false);
        updateTaskQuery('searchType', 'default');
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
    // set highlighted false
    if (tasks.highlighted !== false) {
      // this needs to be bigger than effect time
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
          // error occured in first loading
          toast.error(tasks.message, { toastId: 'load-error' });
          // return to collections
          navigate('/');
        }
      } else {
        if (tasks.message !== '') {
          switch (tasks.status) {
            case 'failed':
              // server returns error
              toast.error(tasks.message);
              break;
            case 'warning':
              // server returns success but with a message
              toast.warn(tasks.message, { toastId: 'warn' });
              break;
            case 'idle':
              // server returns success, message comes from reducers
              toast.success(tasks.message, { toastId: 'success' });
              break;
          }
        }
        // reset status to idle and remove message
        dispatch(taskResetState());
        // rebuild url for browser by returned and valid filter values
        dispatch(taskBuildURL());
        // update search fields with response data
        setSearch({
          keywords: tasks.queryParts.keywords,
          searchType: tasks.queryParts.searchType,
        });
      }
    }
  }, [dispatch, navigate, tasks.collection, tasks.queryParts, tasks.status, tasks.message]);

  const paginator: JSX.Element = (
    <Paginator
      page={tasks.queryParts.page}
      isNextPage={tasks.isNextPage}
      refreshPage={tasks.refreshPage}
      selectAction={(value) => updateTaskQuery('page', value as string)}
    />
  );

  return (
    <DefaultLayout loading={tasks.status === 'loading'}>
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
          action={() => updateTaskQuery('keywords', search.keywords)}
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
        {tasks.data && tasks.data.length > 0 ? (
          <>
            {paginator}
            <section className="list-container">
              <div className="list-grid">
                {tasks.data.map((task, index) => (
                  <Task key={task._id} index={index} task={task} highlighted={tasks.highlighted} />
                ))}
              </div>
            </section>
            {paginator}
          </>
        ) : (
          <section className="list-empty-container">
            <AiOutlineExclamationCircle className="icon" />
            <span>No task found</span>
          </section>
        )}
      </>
    </DefaultLayout>
  );
};

export default TaskList;
