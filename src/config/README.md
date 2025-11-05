# Video Configuration System

Sistema de configuração centralizada para controlar vídeos do Vturb e tempos de exibição da DTC na página principal.

## Como Usar

### 1. Visualizar Configuração Atual

Abra o arquivo `videoConfig.ts` para ver qual vídeo está ativo:

```typescript
export const ACTIVE_VIDEO_ID = 'bakingSoda';
```

### 2. Adicionar um Novo Vídeo

No objeto `AVAILABLE_VIDEOS`, adicione uma nova entrada:

```typescript
export const AVAILABLE_VIDEOS: Record<string, VideoConfig> = {
  bakingSoda: {
    id: 'bakingSoda',
    name: 'Baking Soda Cures Impotence',
    embedUrl: 'https://scripts.converteai.net/.../embed.html',
    playerId: '69064af321067174bb52d6e9',
    showDTCAtSeconds: 2590  // 43 minutos e 10 segundos
  },

  // Adicione seu novo vídeo aqui:
  meuNovoVideo: {
    id: 'meuNovoVideo',
    name: 'Nome do Meu Vídeo',
    embedUrl: 'https://scripts.converteai.net/.../embed.html',  // URL do iframe
    playerId: 'SEU_PLAYER_ID_AQUI',  // ID do player Vturb
    showDTCAtSeconds: 120  // Mostrar DTC após 2 minutos (120 segundos)
  }
};
```

### 3. Trocar o Vídeo Ativo

Para usar um vídeo diferente, altere apenas esta linha:

```typescript
// De:
export const ACTIVE_VIDEO_ID = 'bakingSoda';

// Para:
export const ACTIVE_VIDEO_ID = 'meuNovoVideo';
```

### 4. Ajustar Tempo de Exibição da DTC

Para mudar quando a DTC aparece, altere o valor `showDTCAtSeconds`:

```typescript
showDTCAtSeconds: 120  // DTC aparece após 2 minutos
showDTCAtSeconds: 300  // DTC aparece após 5 minutos
showDTCAtSeconds: 600  // DTC aparece após 10 minutos
```

## Modo Debug

Para ver logs detalhados no console do navegador, adicione `?debug=true` na URL:

```
http://localhost:5173/?debug=true
```

Você verá logs como:
- `[useVturbPlayer] Time update: 45.23s` - Tempo atual do vídeo
- `[useVturbPlayer] Player ready` - Player carregou
- `[MainPage] DTC triggered at 120.00s` - DTC foi ativada

## Modo de Teste Rápido

Para testar rapidamente sem assistir o vídeo inteiro:

1. Configure um tempo curto (ex: 10 segundos):
   ```typescript
   showDTCAtSeconds: 10
   ```

2. Ative o modo debug:
   ```
   http://localhost:5173/?debug=true
   ```

3. Reproduza o vídeo e observe os logs no console

4. Após testar, volte o tempo para o valor real

## Estrutura do VideoConfig

```typescript
interface VideoConfig {
  id: string;              // Identificador único interno
  name: string;            // Nome descritivo do vídeo
  embedUrl: string;        // URL completa do iframe do Vturb
  playerId: string;        // ID do player (necessário para comunicação)
  showDTCAtSeconds: number; // Segundos para mostrar a DTC
}
```

## Encontrando as Informações do Vídeo

### Player ID
Está na URL do embed do Vturb:
```
https://scripts.converteai.net/f5ab9e88-cc1b-4dce-a537-c7de7e019d8b/players/69064af321067174bb52d6e9/v4/embed.html
                                                                            ^^^^^^^^^^^^^^^^^^^^^^^^
                                                                            Este é o Player ID
```

### Embed URL
É a URL completa do iframe fornecida pelo Vturb:
```html
<iframe src="https://scripts.converteai.net/.../embed.html"></iframe>
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            Esta é a Embed URL
```

## Convertendo Tempo para Segundos

- 1 minuto = 60 segundos
- 2 minutos = 120 segundos
- 5 minutos = 300 segundos
- 10 minutos = 600 segundos
- 43 minutos 10 segundos = 2590 segundos

## Troubleshooting

### DTC não aparece
1. Verifique se o `playerId` está correto
2. Ative o modo debug para ver se o tempo está sendo atualizado
3. Verifique se o valor de `showDTCAtSeconds` está correto

### Vídeo não carrega
1. Verifique se a `embedUrl` está correta
2. Verifique se não há erros no console do navegador
3. Teste a URL do embed diretamente no navegador

### Logs não aparecem
1. Certifique-se de adicionar `?debug=true` na URL
2. Abra o Console do navegador (F12 > Console)
3. Recarregue a página
