import { useDispatch, useSelector } from 'react-redux';
import { Pagination, ConfigProvider } from 'antd';

import { fetchArticlesThunk, articlesReducerSlice } from '../../redux/reducers/articlesReducer';

import classes from './pagination.module.scss';

const Paginations = () => {
  const pageTotal = useSelector((state) => state.articles.articlesCount);
  const currentPage = useSelector((state) => state.articles.page);
  const dispatch = useDispatch();

  const handleChange = (page) => {
    dispatch(articlesReducerSlice.actions.changePage(page));
    dispatch(fetchArticlesThunk((page - 1) * 5));
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.pagination}>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemBg: '#EBEEF3',
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        <Pagination
          current={currentPage}
          total={pageTotal}
          defaultPageSize={5}
          onChange={handleChange}
          showSizeChanger={false}
          align="center"
        />
      </ConfigProvider>
    </div>
  );
};

export default Paginations;
