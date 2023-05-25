import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/general/hooks';
import { toast } from 'react-toastify';
import { tTaskQueryParts } from '../../app/task/taskTypes';
import {
  taskListCompletion,
  taskListLimit,
  taskListSearchType,
  taskListSort,
} from '../../app/task/taskInitialStates';
import { getTasks } from '../../app/task/taskThunks';
import {
  taskResetState,
  taskBuildURL,
  taskRefreshPage,
  taskToogleEditor,
  taskToogleHighlighted,
  taskUpdateQueryParts,
} from '../../app/task/taskSlice';
import { useCheckLoggedIn } from '../../app/user/userHooks';
import {
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
} from 'react-icons/ai';
import DefaultLayout from '../layout/DefaultLayout';
import Paginator from '../general/Paginator';
import Task from '../task/Task';
import TaskEditorPopup from '../task/TaskEditorPopup';
import ListHeaderSearchBar from '../list/ListHeaderSearchBar';
import RefreshButton from '../general/RefreshButton';
import DropDownMenu from '../general/DropDownMenu';
import DropDownListLabel from '../general/DropDownListLabel';
import { formatDate } from '../../app/general/middlewares';
import ListHeaderTitle from '../list/ListHeaderTitle';

type tSearch = {
  keywords: tTaskQueryParts['keywords'];
  searchType: tTaskQueryParts['searchType'];
};

const TaskList: React.FC = () => {
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

  useEffect(() => {
    // set page title to selected collection name
    if (tasks.collection) {
      document.title = tasks.collection.name;
    }
  }, [tasks.collection]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // if page refreshing has triggered then it requests data from backend
    if (tasks.refreshPage) {
      // waiting 50 ms for creating query string in URL
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

  const updateTaskQuery = (keywords: tSearch['keywords'], searchType: tSearch['searchType']) => {
    // set redux keywords
    dispatch(
      taskUpdateQueryParts({
        queryPart: 'keywords',
        value: keywords,
        refreshPage: false,
      }),
    );
    // set redux searchType and request a page refresh
    dispatch(
      taskUpdateQueryParts({
        queryPart: 'searchType',
        value: searchType,
        refreshPage: true,
      }),
    );
  };

  const paginator: JSX.Element = (
    <Paginator
      page={tasks.queryParts.page}
      isNextPage={tasks.isNextPage}
      refreshPage={tasks.refreshPage}
      selectAction={(value) =>
        dispatch(
          taskUpdateQueryParts({
            queryPart: 'page',
            value: value,
            refreshPage: true,
          }),
        )
      }
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
        <section className="list-header">
          <ListHeaderSearchBar
            search={search}
            setSearch={setSearch}
            action={() =>
              dispatch(
                taskUpdateQueryParts({
                  queryPart: 'keywords',
                  value: search.keywords,
                  refreshPage: true,
                }),
              )
            }
            searchType={
              <DropDownMenu
                wrapperClass="list-drop-down-wrapper"
                listClass="list-drop-down-menu"
                optionClass="icon-wrapper click"
                trigger={
                  <DropDownListLabel text={taskListSearchType[tasks.queryParts.searchType]} />
                }
                ignoredOption={tasks.queryParts.searchType}
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
          />
          <div className="action-bar">
            <div>
              <nav>
                <label
                  className="icon-wrapper click"
                  onClick={() => dispatch(taskToogleEditor(true))}
                >
                  <AiOutlinePlusCircle className="icon" />
                  <span>Add a new task</span>
                </label>
              </nav>
              {tasks.resetSearch && (
                <nav>
                  <label
                    className="icon-wrapper click"
                    onClick={() => updateTaskQuery('', 'default')}
                  >
                    <AiOutlineCloseCircle className="icon" />
                    <span>Reset search</span>
                  </label>
                </nav>
              )}
            </div>
            <div>
              <DropDownMenu
                wrapperClass="list-drop-down-wrapper"
                listClass="list-drop-down-menu"
                optionClass="icon-wrapper click"
                trigger={
                  <DropDownListLabel text={taskListCompletion[tasks.queryParts.completion]} />
                }
                ignoredOption={tasks.queryParts.completion}
                options={taskListCompletion}
                action={(value) =>
                  dispatch(
                    taskUpdateQueryParts({
                      queryPart: 'completion',
                      value: value,
                      refreshPage: true,
                    }),
                  )
                }
                optionIcon={<AiOutlineRightCircle className="icon" />}
              />
              <DropDownMenu
                wrapperClass="list-drop-down-wrapper"
                listClass="list-drop-down-menu"
                optionClass="icon-wrapper click"
                trigger={<DropDownListLabel text={taskListSort[tasks.queryParts.sort]} />}
                ignoredOption={tasks.queryParts.sort}
                options={taskListSort}
                action={(value) =>
                  dispatch(
                    taskUpdateQueryParts({
                      queryPart: 'completion',
                      value: value,
                      refreshPage: true,
                    }),
                  )
                }
                optionIcon={<AiOutlineRightCircle className="icon" />}
              />
              <DropDownMenu
                wrapperClass="list-drop-down-wrapper"
                listClass="list-drop-down-menu"
                optionClass="icon-wrapper click"
                trigger={<DropDownListLabel text={taskListLimit[tasks.queryParts.limit]} />}
                ignoredOption={tasks.queryParts.limit}
                options={taskListLimit}
                action={(value) =>
                  dispatch(
                    taskUpdateQueryParts({
                      queryPart: 'limit',
                      value: value,
                      refreshPage: true,
                    }),
                  )
                }
                optionIcon={<AiOutlineRightCircle className="icon" />}
              />
            </div>
          </div>
        </section>
        {tasks.data && tasks.data.length > 0 ? (
          <>
            {paginator}
            <section className="list-container">
              <div className="list-grid">
                {tasks.data.map((task, index) => (
                  <Task key={index} index={index} task={task} highlighted={tasks.highlighted} />
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