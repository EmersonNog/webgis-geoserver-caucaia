import React from 'react';

const TableFilters = ({
  filterBy,
  setFilterBy,
  filterPesquisador,
  setFilterPesquisador,
  filterLote,
  setFilterLote,
  filterTitular,
  setFilterTitular,
  filterSituacao,
  setFilterSituacao,
  filterLogradouro,
  setFilterLogradouro,
}) => (
  <div className="filter-container">
    <label>
      Filtrar por:
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
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
);

export default TableFilters;
