import React, { useEffect, useState } from "react";
import api from "../../Config/Api";
import {
  useTable,
  useSortBy,
  useRowSelect,
  useFilters,
  usePagination,
} from "react-table";
import Table from "../Table/Table";
import TableFilters from "../TableFilters/TableFilters";
import Pagination from "../Pagination/Pagination";
import SelectedRows from "../SelectedRows/SelectedRows";
import "./AttributesTable.css";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [filterPesquisador, setFilterPesquisador] = useState("");
  const [filterLote, setFilterLote] = useState("");
  const [filterTitular, setFilterTitular] = useState("");
  const [filterSituacao, setFilterSituacao] = useState("");
  const [filterLogradouro, setFilterLogradouro] = useState("");
  const [filterBy, setFilterBy] = useState("pesquisador");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/dados", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        setData(response.data);
      } catch (err) {
        setError("Erro ao buscar dados");
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id_menu" },
      { Header: "Pesquisador", accessor: "pesquisador" },
      { Header: "Lote", accessor: "lote" },
      { Header: "Situação", accessor: "situacao" },
      { Header: "Titular", accessor: "nome" },
      { Header: "Logradouro", accessor: "logradouro" },
      { Header: "Número", accessor: "numero" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds, pageIndex },
    setFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize: setTablePageSize,
    toggleAllRowsSelected,
    toggleRowSelected,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: pageSize,
        filters: [
          {
            id: filterBy,
            value:
              filterBy === "pesquisador"
                ? filterPesquisador
                : filterBy === "lote"
                  ? filterLote
                  : filterBy === "nome"
                    ? filterTitular
                    : filterBy === "situacao"
                      ? filterSituacao
                      : filterLogradouro,
          },
        ],
      },
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          Cell: ({ row }) => (
            <input
              type="checkbox"
              {...row.getToggleRowSelectedProps()}
              onChange={() => handleRowClick(row.id)}
              checked={row.isSelected}
            />
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    setFilter(
      filterBy,
      filterBy === "pesquisador"
        ? filterPesquisador
        : filterBy === "lote"
          ? filterLote
          : filterBy === "nome"
            ? filterTitular
            : filterBy === "situacao"
              ? filterSituacao
              : filterLogradouro
    );
  }, [
    filterPesquisador,
    filterLote,
    filterTitular,
    filterSituacao,
    filterLogradouro,
    filterBy,
    setFilter,
  ]);

  useEffect(() => {
    setTablePageSize(pageSize);
  }, [pageSize, setTablePageSize]);

  const handleRowClick = React.useCallback((rowId) => {
    toggleAllRowsSelected(false);
    toggleRowSelected(rowId, true);
  });

  return (
    <div className="table-container">
      <h1>Dados da Tabela</h1>

      <div className="controls-container">
        <TableFilters
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterPesquisador={filterPesquisador}
          setFilterPesquisador={setFilterPesquisador}
          filterLote={filterLote}
          setFilterLote={setFilterLote}
          filterTitular={filterTitular}
          setFilterTitular={setFilterTitular}
          filterSituacao={filterSituacao}
          setFilterSituacao={setFilterSituacao}
          filterLogradouro={filterLogradouro}
          setFilterLogradouro={setFilterLogradouro}
        />

        <div className="page-size-selector">
          <label htmlFor="pageSize">Linhas por página: </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <Table
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            page={page}
            prepareRow={prepareRow}
            handleRowClick={handleRowClick}
          />
          <Pagination
            previousPage={previousPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            pageOptions={pageOptions}
            gotoPage={gotoPage}
            pageIndex={pageIndex}
          />
        </>
      )}
      <SelectedRows
        selectedRowIds={selectedRowIds}
        selectedFlatRows={selectedFlatRows}
      />
    </div>
  );
};

export default DataTable;
