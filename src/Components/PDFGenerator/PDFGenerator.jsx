import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import backgroundImage from "../../assets/images/layout.png";
import secondBackgroundImage from "../../assets/images/layout_second_page.png";

const PDFGenerator = ({ selectedFlatRows }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfVisible, setPdfVisible] = useState(false);

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;

    let cursorY = margin + 57;

    const imgWidth = pageWidth;
    const imgHeight = pageHeight;
    doc.addImage(backgroundImage, "JPEG", 0, 0, imgWidth, imgHeight);

    selectedFlatRows.forEach((row) => {
      const {
        orgao_cadastrador,
        data,
        pesquisador,
        logradouro,
        numero,
        complemento,
        bairro,
        quadra,
        lote,
        ponto_referencia,
        nome,
        telefone,
        celular,
        mae,
        pai,
        doc_identificacao,
        expeditor,
        cpf,
        dt_nascimento,
        nis,
        estado_civil,
        regime_casamento,
        grau_instrucao,
        situacao_profissional,
        profissao,
        empresa,
        carteira_assinada,
        renda_mes,
        outro_titular,
        nome_2_titular,
        telefone_2_titular,
        celular_2_titular,
        mae_2_titular,
        pai_2_titular,
        doc_identificacao_2_titular,
        expeditor_2_titular,
        cpf_2_titular,
        dt_nascimento_2_titular,
        nis_2_titular,
        estado_civil_2_titular,
        regime_casamento_2_titular,
        grau_instrucao_2_titular,
        situacao_profissional_2_titular,
        profissao_2_titular,
        empresa_2_titular,
        carteira_assinada_2_titular,
        renda_mes_2_titular,
        outro_titular_2_titular,
        nome_3_titular,
        telefone_3_titular,
        celular_3_titular,
        mae_3_titular,
        pai_3_titular,
        doc_identificacao_3_titular,
        expeditor_3_titular,
        cpf_3_titular,
        dt_nascimento_3_titular,
        nis_3_titular,
        estado_civil_3_titular,
        regime_casamento_3_titular,
        grau_instrucao_3_titular,
        situacao_profissional_3_titular,
        profissao_3_titular,
        empresa_3_titular,
        carteira_assinada_3_titular,
        renda_mes_3_titular,
        tempo_residencia_atual_moradia,
        qtd_pessoas_residencia,
        cohabitacao,
        condicao_ocupacao_lote,
        divisao,
        tipo_edificacao,
        qtd_imoveis,
        outro_imovel,
        qtd_familiares_problema_saude,
        tipo_problema,
        morte_ultimos_2_anos,
        causa_morte,
        deficiente_residente,
        tipo_deficiencia,
        idoso_residente,
        qtd_idoso,
        nome_1,
        idade_1,
        profissao_1,
        renda_mes_1,
        parentesco_1,
        estado_civil_1,
        nome_2,
        idade_2,
        profissao_2,
        renda_mes_2,
        parentesco_2,
        estado_civil_2,
        nome_3,
        idade_3,
        profissao_3,
        renda_mes_3,
        parentesco_3,
        estado_civil_3,
        nome_4,
        idade_4,
        profissao_4,
        renda_mes_4,
        parentesco_4,
        estado_civil_4,
        nome_5,
        idade_5,
        profissao_5,
        renda_mes_5,
        parentesco_5,
        estado_civil_5,
        nome_6,
        idade_6,
        profissao_6,
        renda_mes_6,
        parentesco_6,
        estado_civil_6,
        nome_7,
        idade_7,
        profissao_7,
        renda_mes_7,
        parentesco_7,
        estado_civil_7,
        nome_8,
        idade_8,
        profissao_8,
        renda_mes_8,
        parentesco_8,
        estado_civil_8,
        nome_9,
        idade_9,
        profissao_9,
        renda_mes_9,
        parentesco_9,
        estado_civil_9,
        nome_10,
        idade_10,
        profissao_10,
        renda_mes_10,
        parentesco_10,
        estado_civil_10,
        conhecim_existen_associac_moradores_centro_comunit_bairro,
        participa_reuniao_associac_moradores,
        prioridade_desenvolvimento_trabalho_comunitario,
        acesso_informacoes,
        fonte_acesso_informacoes,
        doc_ocupante_possui_imovel,
        outros_5,
      } = row;

      const formatValue = (value) => (value ? value : "N/A");

      // Criação da Tabela 2x2
      autoTable(doc, {
        startY: cursorY,
        head: [["Cabeçalho", ""]],
        body: [
          [
            `Órgão Cadastrador: ${formatValue(orgao_cadastrador)}`,
            `Data: ${formatValue(data)}`,
          ],
          [`Cadastrador: ${formatValue(pesquisador)}`, ""],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 2 },
          1: { cellWidth: (pageWidth - 2 * margin) / 2 },
        },
      });

      cursorY = doc.lastAutoTable.finalY + 3;

      // Criação da Tabela 3x3
      autoTable(doc, {
        startY: cursorY,
        head: [["Dados do Imóvel", "", ""]],
        body: [
          [
            `Logradouro: ${formatValue(logradouro)}`,
            `Bairro: ${formatValue(bairro)}`,
            `Ponto de Referência: ${formatValue(ponto_referencia)}`,
          ],
          [
            `Número da Casa: ${formatValue(numero)}`,
            `Quadra: ${formatValue(quadra)}`,
            ``,
          ],
          [
            `Complemento: ${formatValue(complemento)}`,
            `Lote: ${formatValue(lote)}`,
            ``,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 3 },
          1: { cellWidth: (pageWidth - 2 * margin) / 3 },
          2: { cellWidth: (pageWidth - 2 * margin) / 3 },
        },
      });

      cursorY = doc.lastAutoTable.finalY + 3;

      // Criação da Tabela 9x2 com dados manuais
      autoTable(doc, {
        startY: cursorY,
        head: [["Dados do Primeiro Titular", ""]],
        body: [
          [`Nome: ${formatValue(nome)}`, `CPF: ${formatValue(cpf)}`],
          [
            `Telefone de Contato: ${formatValue(telefone)}`,
            `Celular: ${formatValue(celular)}`,
          ],
          [
            `Nome da Mãe: ${formatValue(mae)}`,
            `Nome do Pai: ${formatValue(pai)}`,
          ],
          [
            `Documento de Identificação: ${formatValue(doc_identificacao)}`,
            `Orgão Expeditor: ${formatValue(expeditor)}`,
          ],
          [
            `Data de Nascimento: ${formatValue(dt_nascimento)}`,
            `NIS: ${formatValue(nis)}`,
          ],
          [
            `Estado Civil: ${formatValue(estado_civil)}`,
            `Regime de Casamento: ${formatValue(regime_casamento)}`,
          ],
          [
            `Grau de Instrução: ${formatValue(grau_instrucao)}`,
            `Situação de Trabalho: ${formatValue(situacao_profissional)}`,
          ],
          [
            `Profissão/Ocupação: ${formatValue(profissao)}`,
            `Empresa que trabalha: ${formatValue(empresa)}`,
          ],
          [
            `Carteira Assinada: ${formatValue(carteira_assinada)}`,
            `Renda Mensal: ${formatValue(renda_mes)}`,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 2 },
          1: { cellWidth: (pageWidth - 2 * margin) / 2 },
        },
      });

      cursorY = doc.lastAutoTable.finalY + 3;

      if (outro_titular !== "NÃO") {
        autoTable(doc, {
          startY: cursorY,
          head: [["Dados do Segundo Titular", ""]],
          body: [
            [
              `Nome: ${formatValue(nome_2_titular)}`,
              `CPF: ${formatValue(cpf_2_titular)}`,
            ],
            [
              `Telefone de Contato: ${formatValue(telefone_2_titular)}`,
              `Celular: ${formatValue(celular_2_titular)}`,
            ],
            [
              `Nome da Mãe: ${formatValue(mae_2_titular)}`,
              `Nome do Pai: ${formatValue(pai_2_titular)}`,
            ],
            [
              `Documento de Identificação: ${formatValue(doc_identificacao_2_titular)}`,
              `Orgão Expeditor: ${formatValue(expeditor_2_titular)}`,
            ],
            [
              `Data de Nascimento: ${formatValue(dt_nascimento_2_titular)}`,
              `NIS: ${formatValue(nis_2_titular)}`,
            ],
            [
              `Estado Civil: ${formatValue(estado_civil_2_titular)}`,
              `Regime de Casamento: ${formatValue(regime_casamento_2_titular)}`,
            ],
            [
              `Grau de Instrução: ${formatValue(grau_instrucao_2_titular)}`,
              `Situação de Trabalho: ${formatValue(situacao_profissional_2_titular)}`,
            ],
            [
              `Profissão/Ocupação: ${formatValue(profissao_2_titular)}`,
              `Empresa que trabalha: ${formatValue(empresa_2_titular)}`,
            ],
            [
              `Carteira Assinada: ${formatValue(carteira_assinada_2_titular)}`,
              `Renda Mensal: ${formatValue(renda_mes_2_titular)}`,
            ],
          ],
          margin: { left: margin },
          styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
          headStyles: {
            fillColor: hexToRgb("#FF5A17"),
            textColor: hexToRgb("#FFFFFF"),
          },
          theme: "striped",
          columnStyles: {
            0: { cellWidth: (pageWidth - 2 * margin) / 2 },
            1: { cellWidth: (pageWidth - 2 * margin) / 2 },
          },
        });

        cursorY = doc.lastAutoTable.finalY + 3;
      }

      doc.addPage();
      doc.addImage(secondBackgroundImage, "JPEG", 0, 0, imgWidth, imgHeight);
      cursorY = margin + 40;

      if (outro_titular_2_titular !== "NÃO") {
        autoTable(doc, {
          startY: cursorY,
          head: [["Dados do Terceiro Titular", ""]],
          body: [
            [
              `Nome: ${formatValue(nome_3_titular)}`,
              `CPF: ${formatValue(cpf_3_titular)}`,
            ],
            [
              `Telefone de Contato: ${formatValue(telefone_3_titular)}`,
              `Celular: ${formatValue(celular_3_titular)}`,
            ],
            [
              `Nome da Mãe: ${formatValue(mae_3_titular)}`,
              `Nome do Pai: ${formatValue(pai_3_titular)}`,
            ],
            [
              `Documento de Identificação: ${formatValue(doc_identificacao_3_titular)}`,
              `Orgão Expeditor: ${formatValue(expeditor_3_titular)}`,
            ],
            [
              `Data de Nascimento: ${formatValue(dt_nascimento_3_titular)}`,
              `NIS: ${formatValue(nis_3_titular)}`,
            ],
            [
              `Estado Civil: ${formatValue(estado_civil_3_titular)}`,
              `Regime de Casamento: ${formatValue(regime_casamento_3_titular)}`,
            ],
            [
              `Grau de Instrução: ${formatValue(grau_instrucao_3_titular)}`,
              `Situação de Trabalho: ${formatValue(situacao_profissional_3_titular)}`,
            ],
            [
              `Profissão/Ocupação: ${formatValue(profissao_3_titular)}`,
              `Empresa que trabalha: ${formatValue(empresa_3_titular)}`,
            ],
            [
              `Carteira Assinada: ${formatValue(carteira_assinada_3_titular)}`,
              `Renda Mensal: ${formatValue(renda_mes_3_titular)}`,
            ],
          ],
          margin: { left: margin },
          styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
          headStyles: {
            fillColor: hexToRgb("#FF5A17"),
            textColor: hexToRgb("#FFFFFF"),
          },
          theme: "striped",
          columnStyles: {
            0: { cellWidth: (pageWidth - 2 * margin) / 2 },
            1: { cellWidth: (pageWidth - 2 * margin) / 2 },
          },
        });

        cursorY = doc.lastAutoTable.finalY + 3;
      }

      autoTable(doc, {
        startY: cursorY,
        head: [["Informações do Imóvel e da Família", ""]],
        body: [
          [
            `Tempo de Residência: ${formatValue(tempo_residencia_atual_moradia)}`,
            `Nº de Moradores: ${formatValue(qtd_pessoas_residencia)}`,
          ],
          [
            `Cohabitação: ${formatValue(cohabitacao)}`,
            `Condição de Ocupação do Lote: ${formatValue(condicao_ocupacao_lote)}`,
          ],
          [
            `Divisão da Edificação: ${formatValue(divisao)}`,
            `Tipo da Edificação: ${formatValue(tipo_edificacao)}`,
          ],
          [
            `Número de Construções por Lote: ${formatValue(qtd_imoveis)}`,
            `Possui outro Imóvel: ${formatValue(outro_imovel)}`,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 2 },
          1: { cellWidth: (pageWidth - 2 * margin) / 2 },
        },
      });

      cursorY = doc.lastAutoTable.finalY + 3;

      autoTable(doc, {
        startY: cursorY,
        head: [
          [
            {
              content: "Informações dos demais moradores do imóvel",
              colSpan: 7,
            },
          ],
          [
            "",
            "Nome",
            "Idade",
            "Profissão",
            "Renda Mensal",
            "Estado Civil",
            "Parentesco",
          ],
        ],
        body: [
          [
            `1`,
            `${formatValue(nome_1)}`,
            `${formatValue(idade_1)}`,
            `${formatValue(profissao_1)}`,
            `${formatValue(renda_mes_1)}`,
            `${formatValue(estado_civil_1)}`,
            `${formatValue(parentesco_1)}`,
          ],
          [
            `2`,
            `${formatValue(nome_2)}`,
            `${formatValue(idade_2)}`,
            `${formatValue(profissao_2)}`,
            `${formatValue(renda_mes_2)}`,
            `${formatValue(estado_civil_2)}`,
            `${formatValue(parentesco_2)}`,
          ],
          [
            `3`,
            `${formatValue(nome_3)}`,
            `${formatValue(idade_3)}`,
            `${formatValue(profissao_3)}`,
            `${formatValue(renda_mes_3)}`,
            `${formatValue(estado_civil_3)}`,
            `${formatValue(parentesco_3)}`,
          ],
          [
            `4`,
            `${formatValue(nome_4)}`,
            `${formatValue(idade_4)}`,
            `${formatValue(profissao_4)}`,
            `${formatValue(renda_mes_4)}`,
            `${formatValue(estado_civil_4)}`,
            `${formatValue(parentesco_4)}`,
          ],
          [
            `5`,
            `${formatValue(nome_5)}`,
            `${formatValue(idade_5)}`,
            `${formatValue(profissao_5)}`,
            `${formatValue(renda_mes_5)}`,
            `${formatValue(estado_civil_5)}`,
            `${formatValue(parentesco_5)}`,
          ],
          [
            `6`,
            `${formatValue(nome_6)}`,
            `${formatValue(idade_6)}`,
            `${formatValue(profissao_6)}`,
            `${formatValue(renda_mes_6)}`,
            `${formatValue(estado_civil_6)}`,
            `${formatValue(parentesco_6)}`,
          ],
          [
            `7`,
            `${formatValue(nome_7)}`,
            `${formatValue(idade_7)}`,
            `${formatValue(profissao_7)}`,
            `${formatValue(renda_mes_7)}`,
            `${formatValue(estado_civil_7)}`,
            `${formatValue(parentesco_7)}`,
          ],
          [
            `8`,
            `${formatValue(nome_8)}`,
            `${formatValue(idade_8)}`,
            `${formatValue(profissao_8)}`,
            `${formatValue(renda_mes_8)}`,
            `${formatValue(estado_civil_8)}`,
            `${formatValue(parentesco_8)}`,
          ],
          [
            `9`,
            `${formatValue(nome_9)}`,
            `${formatValue(idade_9)}`,
            `${formatValue(profissao_9)}`,
            `${formatValue(renda_mes_9)}`,
            `${formatValue(estado_civil_9)}`,
            `${formatValue(parentesco_9)}`,
          ],
          [
            `10`,
            `${formatValue(nome_10)}`,
            `${formatValue(idade_10)}`,
            `${formatValue(profissao_10)}`,
            `${formatValue(renda_mes_10)}`,
            `${formatValue(estado_civil_10)}`,
            `${formatValue(parentesco_10)}`,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 0.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: {
            cellWidth: (pageWidth - 2 * margin) / 16,
            fontStyle: "italic",
            halign: "center",
          },
          1: { cellWidth: (pageWidth - 2 * margin) / 3.55 },
          2: { cellWidth: (pageWidth - 2 * margin) / 9.4 },
          3: { cellWidth: (pageWidth - 2 * margin) / 6.4 },
          4: { cellWidth: (pageWidth - 2 * margin) / 8 },
          5: { cellWidth: (pageWidth - 2 * margin) / 9 },
          6: { cellWidth: (pageWidth - 2 * margin) / 6.4 },
        },
      });

      cursorY = doc.lastAutoTable.finalY + 3;

      // Criação da Tabela 2x4
      autoTable(doc, {
        startY: cursorY,
        head: [["Situação de Saúde na Família", ""]],
        body: [
          [
            `Membros com Problemas de Saúde: ${formatValue(qtd_familiares_problema_saude)}`,
            `Tipo de Problemas: ${formatValue(tipo_problema)}`,
          ],
          [
            `Mortes nos Últimos 2 Anos: ${formatValue(morte_ultimos_2_anos)}`,
            `Causa da Morte: ${formatValue(causa_morte)}`,
          ],
          [
            `Deficientes Residindo na Família: ${formatValue(deficiente_residente)}`,
            `Tipo de Deficiências: ${formatValue(tipo_deficiencia)}`,
          ],
          [
            `Idosos Residindo com a Família: ${formatValue(idoso_residente)}`,
            `Quantidade de Idosos: ${formatValue(qtd_idoso)}`,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 2 },
          1: { cellWidth: (pageWidth - 2 * margin) / 2 },
        },
      });

      doc.addPage();
      doc.addImage(secondBackgroundImage, "JPEG", 0, 0, imgWidth, imgHeight);
      cursorY = margin + 40;

      // Criação da Tabela 2x2
      autoTable(doc, {
        startY: cursorY,
        head: [["Social e Comunitário", ""]],
        body: [
          [
            `Possui conhecimento da existência de Associações de Moradores e Centro Comunitário no Bairro: ${formatValue(conhecim_existen_associac_moradores_centro_comunit_bairro)}`,
            `Participa das reuniões das Associações de Moradores: ${formatValue(participa_reuniao_associac_moradores)}`,
          ],
          [
            `Prioridades para o desenvolvimento do trabalho comunitário: ${formatValue(prioridade_desenvolvimento_trabalho_comunitario)}`,
            ``,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 2 },
          1: { cellWidth: (pageWidth - 2 * margin) / 2 },
        },
      });

      cursorY = doc.lastAutoTable.finalY + 3;

      // Criação da Tabela 2x2
      autoTable(doc, {
        startY: cursorY,
        head: [["Acesso a Informação", ""]],
        body: [
          [
            `Como tem Acesso à Informação: ${formatValue(acesso_informacoes)}`,
            `Quais Veículos de Informação: ${formatValue(fonte_acesso_informacoes)}`,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 2 },
          1: { cellWidth: (pageWidth - 2 * margin) / 2 },
        },
      });

      cursorY = doc.lastAutoTable.finalY + 3;

      // Criação da Tabela 2x2
      autoTable(doc, {
        startY: cursorY,
        head: [["Documentos do Imóvel que o(a) Ocupante Possui", ""]],
        body: [
          [
            `Documentação que o Ocupante Possui: ${formatValue(doc_ocupante_possui_imovel)}`,
            `Outros Documentos: ${formatValue(outros_5)}`,
          ],
        ],
        margin: { left: margin },
        styles: { fontSize: 8, cellPadding: 1.5, cellWidth: "auto" },
        headStyles: {
          fillColor: hexToRgb("#FF5A17"),
          textColor: hexToRgb("#FFFFFF"),
        },
        theme: "striped",
        columnStyles: {
          0: { cellWidth: (pageWidth - 2 * margin) / 2 },
          1: { cellWidth: (pageWidth - 2 * margin) / 2 },
        },
      });

      if (cursorY + 10 > pageHeight - margin) {
        doc.addPage();
        doc.addImage(secondBackgroundImage, "JPEG", 0, 0, imgWidth, imgHeight);
        cursorY = margin + 20;
      }
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
    setPdfVisible(true);
  };

  const togglePdfVisibility = () => {
    if (pdfVisible) {
      setPdfVisible(false);
    } else {
      generatePDF();
    }
  };

  return (
    <div>
      <button onClick={togglePdfVisibility}>
        {pdfVisible ? "Ocultar PDF" : "Mostrar PDF"}
      </button>
      {pdfVisible && pdfUrl && (
        <iframe
          src={`${pdfUrl}#view=fitH&pagemode=none`}
          style={{
            width: "600px",
            marginTop: "10px",
            height: "100vh",
            border: "none",
            display: "flex",
          }}
          title="PDF Viewer"
        />
      )}
    </div>
  );
};

export default PDFGenerator;
