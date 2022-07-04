import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineVerticalRight,
} from "react-icons/ai";
import { tsTaskQueryParts, tsTaskState } from "../app/tasks/taskTypes";

interface tsProps {
  page: tsTaskQueryParts["page"];
  isNextPage: tsTaskState["isNextPage"];
  refreshPage: tsTaskState["refreshPage"];
  selectAction: (value: string) => void;
}

const Paginator: React.FC<tsProps> = ({
  page,
  isNextPage,
  refreshPage,
  selectAction,
}) => {
  const pageCurr: number = page === "" ? 1 : parseInt(page);
  const pagePrev: number = pageCurr - 1;
  const pageNext: number = pageCurr + 1;
  return (
    <section className="paginator-container">
      <div className="paginator-wrapper">
        {refreshPage ? (
          <div className="text">Please wait...</div>
        ) : pageCurr === 1 ? (
          isNextPage ? (
            <>
              <button className="icon inactive">
                <AiOutlineLeft />
              </button>
              <button className="text inactive">1</button>
              <button
                className="text click"
                title={`Page: ${pageNext}`}
                onClick={() => selectAction(String(pageNext))}
              >
                {pageNext}
              </button>
              <button
                className="icon click"
                title="Next page"
                onClick={() => selectAction(String(pageNext))}
              >
                <AiOutlineRight />
              </button>
            </>
          ) : (
            <div className="text">1 page</div>
          )
        ) : (
          <>
            <button
              className="icon click"
              title="First page"
              onClick={() => selectAction("1")}
            >
              <AiOutlineVerticalRight />
            </button>
            <button
              className="icon click"
              title="Previous page"
              onClick={() => selectAction(String(pagePrev))}
            >
              <AiOutlineLeft />
            </button>
            <button
              className="text click"
              title={`Page: ${pagePrev}`}
              onClick={() => selectAction(String(pagePrev))}
            >
              {pagePrev}
            </button>
            <button className="text inactive">{pageCurr}</button>
            {isNextPage ? (
              <>
                <button
                  className="text click"
                  title={`Page: ${pageNext}`}
                  onClick={() => selectAction(String(pageNext))}
                >
                  {pageNext}
                </button>
                <button
                  className="icon click"
                  title="Next page"
                  onClick={() => selectAction(String(pageNext))}
                >
                  <AiOutlineRight />
                </button>
              </>
            ) : (
              <button className="icon inactive">
                <AiOutlineRight />
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Paginator;
