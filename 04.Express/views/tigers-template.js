// const express=require('express');
// const app = express();
// app.use(express.static(__dirname + '/public'));

module.exports = {
    home : function(trs) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>기아 타이거즈</title>
            <style>
                th, tr {
                    text-align : center;
                }
                img {
                    height:50px;
                }
            </style>
            <script src="https://kit.fontawesome.com/95a6a0adef.js" crossorigin="anonymous"></script>
        </head>
        <body style="margin:50px">
            <img src="/tigers-img/emblem.jpg" style="height: 250px;">
            <button onclick="location.href='/create'">추가</button>
            <hr>
            <table>
                <tr>
                    <th>ID</th>
                    <th>선수명</th>
                    <th>사진</th>
                    <th>백넘버</th>
                    <th>포지션</th>
                    <th>수정/삭제</th>
                </tr>
                ${trs}
            </table>
        </body>
        </html>
        `
    },
    trsGen: function(rows) {
        let trs = '';
        for (let row of rows) {
            trs += '<tr>';
            trs += `<td>${row.id}</td><td>${row.player}</td><td><img src="/tigers-img/${row.player}.jpg"></td><td>${row.backNo}</td><td>${row.position}</td>`;
            trs += `<td><a href="/update?id=${row.id}"><i class="fa-solid fa-people-arrows"></i></a>
                        <a href="/delete?id=${row.id}"><i class="fa-sharp fa-solid fa-user-minus"></i></a></td>`;
            trs += '</tr>';
            
        }
        return trs
    },
    createForm : function() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>기아 타이거즈</title>
            <style>
                th, tr {
                    text-align : center
                }
            </style>
        </head>
        <body style="margin:50px">
            <h1>기아 타이거즈 선수단</h1>
            <button onclick="location.href='/'">홈으로</button>
            <hr>
            <form action="/create" method="POST">
                <table>
                    <tr>
                        <td>선수명</td><td><input type="text" name="player"></td>
                    </tr>
                    <tr>
                        <td>백넘버</td><td><input type="text" name="backNo"></td>
                    </tr>
                    <tr>
                        <td>포지션</td><td><input type="text" name="position"></td>
                    </tr>
                    <tr>
                        <td colspan="2"><input type="submit" value="추가"></td>
                    </tr>
                </table>
            </form>
        </body>
        </html>        
        `;
    },
    updateForm : function(id, player, backNo, position) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>기아 타이거즈</title>
            <style>
                th, tr {
                    text-align : center
                }
            </style>
        </head>
        <body style="margin:50px">
            <h1>기아 타이거즈 선수단</h1>
            <button onclick="location.href='/'">홈으로</button>
            <hr>
            <form action="/update" method="POST">
                <input type="hidden" name="id" value="${id}">
                <table>
                    <tr>
                        <td>선수명</td><td><input type="text" name="player" value=${player}></td>
                    </tr>
                    <tr>
                        <td>백넘버</td><td><input type="text" name="backNo" value=${backNo}></td>
                    </tr>
                    <tr>
                        <td>포지션</td><td><input type="text" name="position" value=${position}></td>
                    </tr>
                    <tr>
                        <td colspan="2"><input type="submit" value="수정"></td>
                    </tr>
                </table>
            </form>
        </body>
        </html>        
        `;
    },
    deleteForm: function(id) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <script>
                let answer = confirm('Are you sure to delete?');
                if (answer)
                    location.href = '/deleteConfirm?id=${id}';
                else
                    location.href = '/';
            </script>
        </body>
        </html>
        `;
    }
}