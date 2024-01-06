# Patyson community games

Repository for puzzles created by community of Patyson.

## Examples:

- [nonogrid](https://github.com/vendigo/patyson-community-games/tree/master/nonogrid) - created with Svelte
- [imageSudoku](https://github.com/vendigo/patyson-community-games/tree/master/imageSudoku) - created with Phaser.js
- [mathRebus](https://github.com/vendigo/patyson-community-games/tree/master/mathRebus) - created with React

## Integration

### Loading level info

Level info should be loaded with request to /level.json

```typescript
    fetch('level.json')
        .then((response) => response.json())
        .then((levelInfo) => {
            level = levelInfo;
        });
```

### Submitting results

See https://github.com/vendigo/patyson-community-games/blob/master/calculator/src/lib/patysonClient.ts

```typescript
const urlParams = new URLSearchParams(window.location.search).toString()
const gameName = this.getGameName();

const fetchResult = await fetch(`/api/game/${gameName}?${urlParams}`, {
  method: 'POST',
  headers: {
                'Content-Type': 'application/json; charset=UTF-8'
           }
});
const response = await fetchResult.json() as GameEventResponse;
```
To submit game completion, send POST request to /api/game/gameName?urlParams without request body.

Notes:
- Don't forget to add current url params to the request
- Don't hardcode gameName, resolve it from window.location.pathname (It will be different for each level)
- Use reward info from the response to show completion message to the user.

## Guidelines

Game should be optimized for mobile devices. Make sure it has vertical layout and scales correctly.
If you use Phaser.js, just use imageSudoku as a prototype.
