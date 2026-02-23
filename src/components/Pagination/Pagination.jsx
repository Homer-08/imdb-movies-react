import ReactPaginate from "react-paginate"

const Pagination = (props) => {
    const {
        itemsPerPage,
        itemOffset,
        items,
        setItemOffset,
        selectedPage,
        setSelectedPage,
        ref,
        ComponentForPagination,
    } = props

    const endOffset = itemOffset + itemsPerPage
    const currentItems = items?.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(items?.length / itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items?.length

        setItemOffset(newOffset)
        setSelectedPage(event.selected)
    }

    return (
        <>
            {items?.length > 10 && (
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={selectedPage}
                />
            )}
            <ComponentForPagination items={currentItems} itemOffset={itemOffset} ref={ref}/>
        </>
    )
}

export default Pagination
