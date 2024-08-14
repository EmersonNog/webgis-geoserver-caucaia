import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy, useRowSelect, useFilters } from 'react-table';
import './AttributesTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [filterPesquisador, setFilterPesquisador] = useState('');
  const [filterLote, setFilterLote] = useState('');
  const [filterTitular, setFilterTitular] = useState('');
  const [filterSituacao, setFilterSituacao] = useState('');
  const [filterLogradouro, setFilterLogradouro] = useState('');
  const [filterBy, setFilterBy] = useState('pesquisador'); // State to track which filter to use

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/dados', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        setData(response.data);
      } catch (err) {
        setError('Erro ao buscar dados');
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id_menu',
      },
      {
        Header: 'Pesquisador',
        accessor: 'pesquisador',
      },
      {
        Header: 'Lote',
        accessor: 'lote',
      },
      {
        Header: 'Situação',
        accessor: 'situacao',
      },
      {
        Header: 'Titular',
        accessor: 'nome',
      },
      {
        Header: 'Logradouro',
        accessor: 'logradouro',
      },
      {
        Header: 'Número',
        accessor: 'numero',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
    toggleRowSelected,
    setFilter, // function to set the filter
  } = useTable(
    {
      columns,
      data,
      initialState: {
        filters: [
          {
            id: filterBy,
            value:
              filterBy === 'pesquisador'
                ? filterPesquisador
                : filterBy === 'lote'
                  ? filterLote
                  : filterBy === 'nome'
                    ? filterTitular
                    : filterBy === 'situacao'
                      ? filterSituacao
                      : filterLogradouro,
          },
        ],
      },
    },
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
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
      filterBy === 'pesquisador'
        ? filterPesquisador
        : filterBy === 'lote'
          ? filterLote
          : filterBy === 'nome'
            ? filterTitular
            : filterBy === 'situacao'
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
      <div className="filter-container">
        <label>
          Filtrar por:
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="pesquisador">Pesquisador</option>
            <option value="lote">Lote</option>
            <option value="nome">Titular</option>
            <option value="situacao">Situação</option>
            <option value="logradouro">Logradouro</option>
          </select>
        </label>
        {filterBy === 'pesquisador' && (
          <label>
            Pesquisador:
            <input
              type="text"
              value={filterPesquisador}
              onChange={(e) => setFilterPesquisador(e.target.value)}
              placeholder="Filtrar por Pesquisador"
            />
          </label>
        )}
        {filterBy === 'lote' && (
          <label>
            Lote:
            <input
              type="text"
              value={filterLote}
              onChange={(e) => setFilterLote(e.target.value)}
              placeholder="Filtrar por Lote"
            />
          </label>
        )}
        {filterBy === 'nome' && (
          <label>
            Titular:
            <input
              type="text"
              value={filterTitular}
              onChange={(e) => setFilterTitular(e.target.value)}
              placeholder="Filtrar por Titular"
            />
          </label>
        )}
        {filterBy === 'situacao' && (
          <label>
            Situação:
            <input
              type="text"
              value={filterSituacao}
              onChange={(e) => setFilterSituacao(e.target.value)}
              placeholder="Filtrar por Situação"
            />
          </label>
        )}
        {filterBy === 'logradouro' && (
          <label>
            Logradouro:
            <input
              type="text"
              value={filterLogradouro}
              onChange={(e) => setFilterLogradouro(e.target.value)}
              placeholder="Filtrar por Logradouro"
            />
          </label>
        )}
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={row.isSelected ? 'selected' : ''}
                  onClick={() => handleRowClick(row.id)}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <h2>Linhas Selecionadas:</h2>
      <pre>
        {JSON.stringify(
          {
            selectedRowIds,
            selectedFlatRows: selectedFlatRows.map((row) => row.original),
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default DataTable;
