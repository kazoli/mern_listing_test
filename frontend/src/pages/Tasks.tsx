import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FcSearch } from "react-icons/fc";
import {
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineFolderOpen,
  AiOutlineLeftCircle,
} from "react-icons/ai";
import { tsDispatch, tsRootState } from "../app/store";
import { tsTaskQueryParts } from "../app/tasks/taskTypes";
import {
  buildURL,
  toogleHighlighted,
  refreshPage,
  toogleEditor,
  resetTaskState,
  updateTaskQueryParts,
} from "../app/tasks/taskSlice";
import { getTasks } from "../app/tasks/taskService";
import Task from "../components/Task";
import Paginator from "../components/Paginator";
import Spinner from "../components/Spinner";
import TaskEditorPopup from "../components/TaskEditorPopup";
import RefreshButton from "../components/RefreshButton";
import DropDownMenu from "../components/DropDownMenu";

interface tsSearch {
  keywords: tsTaskQueryParts["keywords"];
  searchType: tsTaskQueryParts["searchType"];
}

const Tasks: React.FC = () => {
  const dispatch = useDispatch<tsDispatch>();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state: tsRootState) => state.tasks);

  const [search, setSearch] = useState<tsSearch>({
    keywords: "",
    searchType: "",
  });

  useEffect(() => {
    // set page title to selected collection name
    if (tasks.collection) document.title = tasks.collection.name;
  }, [tasks.collection]);

  useEffect(() => {
    // if page refreshing has triggered then it requests data from backend
    if (tasks.refreshPage) {
      // waiting 50 ms for creating query string in URL
      setTimeout(
        () => dispatch(getTasks(params.collection_id + window.location.search)),
        50
      );
    }
  }, [dispatch, tasks.refreshPage, params.collection_id]);

  useEffect(() => {
    // set highlighted false
    if (tasks.highlighted !== false) {
      // this needs to be bigger than effect time
      setTimeout(() => dispatch(toogleHighlighted(false)), 1500);
    }
  }, [dispatch, tasks.highlighted]);

  useEffect(() => {
    if (tasks.status !== "loading") {
      if (tasks.collection === null) {
        if (tasks.status === "idle") {
          // trigger to request first data from backend
          dispatch(refreshPage());
        } else {
          // error occured in first loading
          toast.error(tasks.message, { toastId: "load-error" });
          // return to collections
          navigate("/");
        }
      } else {
        if (tasks.message !== "") {
          switch (tasks.status) {
            case "failed":
              // server returns error
              toast.error(tasks.message);
              break;
            case "warning":
              // server returns success but with a message
              toast.warn(tasks.message, { toastId: "warn" });
              break;
            case "idle":
              // server returns success, message comes from reducers
              toast.success(tasks.message, { toastId: "success" });
              break;
          }
        }
        // reset status to idle and remove message
        dispatch(resetTaskState());
        // rebuild url for browser by returned and valid filter values
        dispatch(buildURL());
        // update search fields with response data
        setSearch({
          keywords: tasks.queryParts.keywords,
          searchType: tasks.queryParts.searchType,
        });
      }
    }
  }, [
    dispatch,
    navigate,
    tasks.collection,
    tasks.queryParts,
    tasks.status,
    tasks.message,
  ]);

  const updateTaskQuery = (
    keywords: tsSearch["keywords"],
    searchType: tsSearch["searchType"]
  ) => {
    // set redux keywords
    dispatch(
      updateTaskQueryParts({
        queryPart: "keywords",
        value: keywords,
        refreshPage: false,
      })
    );
    // set redux searchType and request a page refresh
    dispatch(
      updateTaskQueryParts({
        queryPart: "searchType",
        value: searchType,
        refreshPage: true,
      })
    );
  };

  const paginator: JSX.Element = (
    <Paginator
      page={tasks.queryParts.page}
      isNextPage={tasks.isNextPage}
      refreshPage={tasks.refreshPage}
      selectAction={(value) =>
        dispatch(
          updateTaskQueryParts({
            queryPart: "page",
            value: value,
            refreshPage: true,
          })
        )
      }
    />
  );

  return (
    <>
      {tasks.status === "loading" && <Spinner />}
      {params.collection_id && tasks.editor !== false && (
        <TaskEditorPopup
          task={
            !tasks.data || tasks.editor === true
              ? false
              : tasks.data[tasks.editor]
          }
          collection_id={params.collection_id}
        />
      )}
      {tasks.refreshButton && (
        <RefreshButton action={() => dispatch(refreshPage())} />
      )}
      <section className="task-collection-title">
        <AiOutlineFolderOpen className="icon" />
        <label>
          {tasks.collection ? (
            <>
              {tasks.collection.name + " - "}
              <span className="inline-block">
                {new Date(tasks.collection.createdAt).toLocaleDateString(
                  "en-gb",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </span>
            </>
          ) : (
            "Please wait..."
          )}
        </label>
      </section>
      <section className="filter-wrapper">
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Enter keywords"
            onChange={(e) =>
              setSearch({
                ...search,
                keywords: e.target.value,
              })
            }
            value={search.keywords}
          />
          <div className="search-control-block">
            <DropDownMenu
              selected={search.searchType}
              options={{
                "": "Search in name and tags",
                name: "Search in name only",
                tags: "Search in tags only",
              }}
              selectAction={(value) =>
                setSearch({
                  ...search,
                  searchType: value,
                })
              }
            />
            <button
              className="search-submit click"
              onClick={() => {
                if (search.keywords.length)
                  updateTaskQuery(search.keywords, search.searchType);
              }}
            >
              <FcSearch className="icon" />
            </button>
          </div>
        </div>
        <div className="action-bar">
          <div>
            <nav>
              <a className="icon-wrapper click" href={"/"}>
                <AiOutlineLeftCircle className="icon" />
                <span>Back to collections</span>
              </a>
            </nav>
            <nav>
              <label
                className="icon-wrapper click"
                onClick={() => dispatch(toogleEditor(true))}
              >
                <AiOutlinePlusCircle className="icon" />
                <span>Add a new task</span>
              </label>
            </nav>
            {tasks.resetSearch && (
              <nav>
                <label
                  className="icon-wrapper click"
                  onClick={() => updateTaskQuery("", "")}
                >
                  <AiOutlineCloseCircle className="icon" />
                  <span>Reset search</span>
                </label>
              </nav>
            )}
          </div>
          <div>
            <DropDownMenu
              selected={tasks.queryParts.completion}
              options={{
                "": "All statuses",
                complete: "Complete tasks only",
                incomplete: "Incomplete tasks only",
              }}
              selectAction={(value) =>
                dispatch(
                  updateTaskQueryParts({
                    queryPart: "completion",
                    value: value,
                    refreshPage: true,
                  })
                )
              }
            />
            <DropDownMenu
              selected={tasks.queryParts.sort}
              options={{
                "": "Name (A-Z)",
                nameDESC: "Name (Z-A)",
                createdDESC: "Recently created at front",
                createdASC: "Formerly created at front",
              }}
              selectAction={(value) =>
                dispatch(
                  updateTaskQueryParts({
                    queryPart: "sort",
                    value: value,
                    refreshPage: true,
                  })
                )
              }
            />
            <DropDownMenu
              selected={tasks.queryParts.limit}
              options={{
                "": "12 / page",
                p36: "36 / page",
                p60: "60 / page",
              }}
              selectAction={(value) =>
                dispatch(
                  updateTaskQueryParts({
                    queryPart: "limit",
                    value: value,
                    refreshPage: true,
                  })
                )
              }
            />
          </div>
        </div>
      </section>
      {tasks.data && tasks.data.length > 0 ? (
        <>
          {paginator}
          <section className="list-container">
            <div className="list-grid">
              {tasks.data?.map((task, index) => (
                <Task
                  key={index}
                  index={index}
                  task={task}
                  highlighted={tasks.highlighted}
                />
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
  );
};

export default Tasks;
