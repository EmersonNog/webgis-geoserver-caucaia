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
    toggleRowSelected,
    setFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
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
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
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

  const handleRowClick = (rowId) => {
    toggleRowSelected(rowId);
  };

  return (
    <div className="table-container">
      <h1>Dados da Tabela</h1>
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
