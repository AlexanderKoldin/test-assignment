# Ответ на тестовое задание

## Что выводит данный код

Исходный код:

```javascript
const arr = [10, 12, 15, 21];

for (var i = 0; i < arr.length; i++) {
	setTimeout(function () {
		console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
	}, 3000);
}
```

Фактический вывод этого кода:

```JavaScript

Bad: undefined
Bad: undefined
Bad: undefined
Bad: undefined

```

Это происходит из-за использования `var`, который не создает отдельную область видимости для каждой итерации. Когда `setTimeout` срабатывает, значение `i` становится равным 4, что выходит за пределы массива arr, и поэтому `arr[i]` возвращает `undefined`.

Модификация кода.

Вариант 1: Использование `let` в цикле
Измените объявление переменной `i` с `var` на `let`, чтобы каждая итерация имела свою собственную область видимости:

```JavaScript

const arr = [10, 12, 15, 21];

for (let i = 0; i < arr.length; i++) {
	setTimeout(function () {
		console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
	}, 3000);
}

```

Вариант 2: Использование замыкания с IIFE (Immediately Invoked Function Expression)
Используйте IIFE, чтобы сохранить текущее значение `i` для каждой итерации:

```JavaScript

const arr = [10, 12, 15, 21];

for (var i = 0; i < arr.length; i++) {
	(function(index) {
		setTimeout(function () {
			console.log(arr[index] > 13 ? `Good: ${arr[index]}` : `Bad: ${arr[index]}`);
		}, 3000);
	})(i);
}
```
Ожидаемый вывод для обеих модификаций:

```JavaScript

Bad: 10
Bad: 12
Good: 15
Good: 21

```
