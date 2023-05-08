import { AiOutlineLeft, AiOutlineRight, AiOutlineVerticalRight } from 'react-icons/ai';
import { tTaskQueryParts, tTaskState } from '../../app/task/taskTypes';

// TODO general types for page, isNextPage, refreshPage
type tProps = {
  page: tTaskQueryParts['page'];
  isNextPage: tTaskState['isNextPage'];
  refreshPage: tTaskState['refreshPage'];
  selectAction: (value: string) => void;
};

const Paginator: React.FC<tProps> = (props) => {
  const pageCurr = props.page === '' ? 1 : parseInt(props.page);
  const pagePrev = String(pageCurr - 1);
  const pageNext = String(pageCurr + 1);

  return (
    <section className="paginator-container">
      <div className="paginator-wrapper">
        {props.refreshPage ? (
          <div className="text">Please wait...</div>
        ) : pageCurr === 1 ? (
          props.isNextPage ? (
            <>
              <button className="icon inactive">
                <AiOutlineLeft />
              </button>
              <button className="text inactive">1</button>
              <button
                className="text click"
                title={`Page: ${pageNext}`}
                onClick={() => props.selectAction(pageNext)}
              >
                {pageNext}
              </button>
              <button
                className="icon click"
                title="Next page"
                onClick={() => props.selectAction(pageNext)}
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
              onClick={() => props.selectAction('1')}
            >
              <AiOutlineVerticalRight />
            </button>
            <button
              className="icon click"
              title="Previous page"
              onClick={() => props.selectAction(pagePrev)}
            >
              <AiOutlineLeft />
            </button>
            <button
              className="text click"
              title={`Page: ${pagePrev}`}
              onClick={() => props.selectAction(pagePrev)}
            >
              {pagePrev}
            </button>
            <button className="text inactive">{pageCurr}</button>
            {props.isNextPage ? (
              <>
                <button
                  className="text click"
                  title={`Page: ${pageNext}`}
                  onClick={() => props.selectAction(pageNext)}
                >
                  {pageNext}
                </button>
                <button
                  className="icon click"
                  title="Next page"
                  onClick={() => props.selectAction(pageNext)}
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
