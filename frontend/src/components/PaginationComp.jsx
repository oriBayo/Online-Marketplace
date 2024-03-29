import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PaginationComp = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1}
            to={
              !isAdmin
                ? `/products/page/${p + 1}`
                : `/admin/productlist/${p + 1}`
            }
          >
            <Pagination.Item key={p + 1} active={p + 1 === page}>
              {p + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default PaginationComp
