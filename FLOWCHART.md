# Fluxograma Mermaid

Este arquivo contém o fluxograma do sistema em formato Mermaid.

## Como Editar

1. Edite este arquivo (`flowchart.mmd`) diretamente
2. Use a sintaxe Mermaid para criar/modificar o diagrama
3. As mudanças serão refletidas automaticamente na visualização

## Sintaxe Mermaid

### Tipos de Nós
- `[Texto]` - Retângulo
- `(Texto)` - Retângulo com cantos arredondados
- `([Texto])` - Estádio (pílula)
- `{Texto}` - Losango (decisão)
- `((Texto))` - Círculo

### Conexões
- `-->` - Seta
- `---` - Linha
- `-->|Texto|` - Seta com label

### Estilos
```
style NodeId fill:#cor,stroke:#cor,stroke-width:2px,color:#fff
```

## Referências

- [Documentação Mermaid](https://mermaid.js.org/)
- [Editor Online](https://mermaid.live/)

## Exemplo Atual

O fluxograma atual mostra o fluxo de consumo de conteúdo:
1. Notificação WhatsApp
2. Redirecionamento Web
3. Tipos de Conteúdo (Quiz, Pesquisa, NPS, Conteúdo)
4. Interação do Usuário
5. Resultado/Feedback
