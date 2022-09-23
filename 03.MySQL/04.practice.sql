CREATE VIEW largeCity 
	AS SELECT * FROM city
	WHERE population>=7000000 WITH CHECK OPTION;

UPDATE largecity SET countrycode='GBR' WHERE id=206;
SELECT * FROM largecity;



dateTable
INSERT INTO dateTable (dt) VALUES
('2017-08-28 17:22:21'), ('2017-02-15 10:22:24'),
('2017-12-09 22:13:24'), ('2018-07-06 20:15:18');
INSERT INTO dateTable VALUES (default, default);


SELECT DATE_FORMAT(dt, '%h:%i:%s %p') from dateTable;

# 디데이
SELECT TO_DAYS('2022-11-17') - TO_DAYS(NOW());

# 요일                              
SELECT DAYOFWEEK(dt) FROM dateTable;


CREATE TABLE girl_group (
    gid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    debut DATE NOT NULL,
    hit_song_id INT
) AUTO_INCREMENT=1001;

INSERT INTO girl_group (name, debut, hit_song_id)
	VALUES ('원더걸스', '2007-02-10', 101),
	('소녀시대', '2007-08-02', 102), ('카라', '2009-07-30', 103),
	('브라운아이드걸스', '2008-01-17', 104), ('다비치', '2009-02-27', 105),
	('2NE1', '2009-07-08', 106), ('f(x)', '2011-04-20', 108),
	('시크릿', '2011-01-06', 109), ('레인보우', '2010-08-12', 110),
	('애프터 스쿨', '2009-11-25', 120), ('포미닛', '2009-08-28', 121);

CREATE TABLE song (
    sid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(32) NOT NULL,
    lyrics VARCHAR(32)
) AUTO_INCREMENT=101;

INSERT INTO song (title, lyrics)
	VALUES ('Tell Me', 'tell me tell me tetetete tel me'),
	('Gee', 'GEE GEE GEE GEE GEE BABY BABY'),
	('미스터', '이름이 뭐야 미스터'),
	('Abracadabra', '이러다 미쳐 내가 여리여리'),
	('8282', 'Give me a call Baby baby'), ('기대해', '기대해'),
	("I Don\'t care", '다른 여자들의 다리를'),
	('Bad Girl Good Girl', '앞에선 한 마디 말도'), ('피노키오', '뉴예삐오'),
	('별빛달빛', '너는 내 별빛 내 마음의 별빛'),
	('A', 'A 워오우 워오우워 우우우'),
	('나혼자', '나 혼자 밥을 먹고 나 혼자 영화 보고'), ('LUV', '설레이나요 '),
	('짧은치마', '짧은 치마를 입고 내가 길을 걸으면'),
	('위아래', '위 아래 위위 아래'), ('Dumb Dumb', '너 땜에 하루종일');


SELECT gg.name, gg.debut, s.title, s.lyrics
	FROM girl_group AS gg
	JOIN song AS s 
	ON s.sid = gg.hit_song_id
	ORDER BY debut;
# 노래 번호가 같은 것 뽑기


# left outer join
SELECT s.sid, gg.name, gg.debut, s.title, s.lyrics
	FROM song AS s 
	left outer JOIN girl_group AS gg
	ON s.sid = gg.hit_song_id;
# 어느 테이블에 어떤 데이터가 있고 없고를 알 수 있음

# right outer join
SELECT s.sid, gg.name, gg.debut, s.title, s.lyrics
	FROM song AS s 
	right outer JOIN girl_group AS gg
	ON s.sid = gg.hit_song_id;


# full outer join - left right union 하기
SELECT s.sid, gg.name, gg.debut, s.title, s.lyrics
	FROM song AS s 
	left outer JOIN girl_group AS gg
	ON s.sid = gg.hit_song_id
UNION
SELECT s.sid, gg.name, gg.debut, s.title, s.lyrics
	FROM song AS s 
	right outer JOIN girl_group AS gg
	ON s.sid = gg.hit_song_id;


	# 데뷔일자가 빠른 다섯 개 걸그룹의 히트송은?(그룹명, 곡명)
SELECT girl_group.name, song.title
	FROM song
	JOIN girl_group
	ON girl_group.hit_song_id=song.sid
	ORDER BY debut
	LIMIT 5;

# 2009년도에 데뷔한 걸그룹의 히트송?
# (걸그룹 이름, 데뷔일, 히트송)
SELECT g.name, g.debut, s.title
	FROM girl_group AS g
	JOIN song AS s
	ON g.hit_song_id=s.sid
	WHERE g.debut BETWEEN DATE('2009-01-01') AND DATE('2009-12-31')
	ORDER BY g.debut;