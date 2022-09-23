/* UPDATE 테이블명
    SET 필드명=값[, 필드명=값, 필드명=값 ...]
    WHERE 조건; 

보통 수정을 할 때 Key를 사용하곤 한다.
primary key .. ex) id.    
*/

INSERT INTO 테이블명
    필드명  
    VALUES (필드명에 대한 값)    # 필드명을 사용하면 일부 필드만 데이터 추가,
                                #    사용하지 않으면 모든 필드를 데이터 추가

INSERT INTO city
	(NAME, CountryCode, District, Population)
	VALUES ('Haenam', 'KOR', 'Chollanam', 100000);
SELECT * FROM city
	WHERE District='Chollanam';

INSERT INTO city
	VALUES (DEFAULT, 'Jangsung', 'KOR', 'Chollanam', 100000);
    # 필드명을 딱히 정하지않고 필드 수에 맞게 설정하면 잘 들어가는 듯
SELECT * FROM city
	WHERE District='chollanam';

# 이름 바꿔보기
UPDATE city SET NAME='changsung'
	WHERE NAME='Jangsung';
SELECT * FROM city
	WHERE district='chollanam';


UPDATE city, (SELECT * FROM city WHERE district='Chollanam') b
	SET city.Population=b.Population+50000
	WHERE city.id=b.id;

DELETE FROM 테이블명
    WHERE 조건 

테이블 생성
CREATE TABLE 테이블명 (
    필드명 데이터 타입 [NOT NULL] a
)

CREATE TABLE tigers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    player VARCHAR(10) NOT NULL, /* 이름이라 타입을 VARCHAR 로 함 / 10글자까지 */
    backNO INT,
    POSITION VARCHAR(10)
    );
DESC tigers;

INSERT INTO tigers
	VALUES(DEFAULT, '김선빈', 3, '내야수');
INSERT INTO tigers
	VALUES(DEFAULT, '박찬호', 1, '내야수');
INSERT INTO tigers
	VALUES(DEFAULT, '나성범', 47, '외야수');
INSERT INTO tigers
	VALUES(DEFAULT, '소크라테스', 30, '외야수');

SELECT * FROM tigers;

INSERT INTO tigers (player,backNO,POSITION)
	VALUES ('김의현',27,'그냥야수');
INSERT INTO tigers (player,backNO,POSITION)
	VALUES ('김의현',27,'그냥야수'),('김의현',27,'그냥야수'),
			('김의현',27,'그냥야수'),('김의현',27,'그냥야수');
SELECT * FROM tigers;


ALTER TABLE tigers
	ADD isDeleted INT DEFAULT 0;
SELECT * FROM tigers;

ALTER TABLE tigers
	CHANGE `POSITION` `position` VARCHAR(10);
SELECT * FROM tigers;