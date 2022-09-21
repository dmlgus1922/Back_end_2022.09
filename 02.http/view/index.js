exports.index = function(title,list,content) {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>웹 기술</title>
</head>
<body style="margin: 50px;">
    <h1>${title}</h1>   <!-- 23.app조회.js에서 변경됨 -->
    <ul>
        ${list}         <!-- 22.app리스트.js에서 변경됨 -->
    </ul>
    <hr>
    <p>
        ${content}      <!-- 23.app조회.js에서 변경됨 -->
    </p>
</body>
</html>
    `;
}