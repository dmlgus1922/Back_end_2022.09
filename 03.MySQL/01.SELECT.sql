USE world;      # DB를 불러옴
SHOW TABLES;    # DB 안의 table(dataFrame 같은 것) 확인
DESC city;      # describe. city가 어떻게 생겼는지 확인

/*
SELECT 필드명 FROM 테이블명
    JOIN 테이블명
    ON 조인 조건;
    WHERE 조건
    GROUP BY 필드명
    HAVING 그룹 조건
    ORDER BY 필드명 순서
    LIMIT 숫자 OFFSET 숫자
*/

SELECT * FROM city;  # select 모든 필드 from 테이블
SELECT * FROM city WHERE countrycode = 'KOR';  # 필드명의 대소문자는 구별하지 않아도 됨
SELECT * FROM city WHERE district = 'Kwangju'; # district가 광주인 것
SELECT NAME,population FROM city WHERE countrycode = 'KOR';
# 필드명을 고름, 근데 이제 컨트리코드 필드명이 kor인 것만 뽑기


# district를 뽑는데 중복 제거(distinct)
SELECT COUNT(*) FROM city; # 행의 개수를 알려주는 듯
SELECT distinct district FROM city WHERE countrycode='KOR';


# 호남 지역의 도시를 뽑은 것
SELECT * FROM city WHERE district='Chollabuk' 
	OR district='Chollanam' OR district='Kwangju';


# MySQL에도 나머지 연산이 있다. 백만의 인구수가 넘으며 짝수인 도시
SELECT * FROM city WHERE CountryCode='KOR'  
	AND Population > 1000000 AND Population%2=0;


# BETWEEN 연산. 백만, 이백만 사이의 한국 도시
SELECT * FROM city WHERE CountryCode='KOR'  
	AND Population>1000000 AND Population<2000000;
SELECT * FROM city WHERE CountryCode='KOR'  
	AND Population BETWEEN 1000000 AND 2000000;


# LIKE 연산. % 외에 비슷하면 뽑아주는 듯. 전라도를 뽑는다
SELECT * FROM city WHERE CountryCode ='KOR' 
	AND District LIKE 'Cholla%';


# 인구수가 1000만 이상의 도시를 인구수의 내림차순으로 조회
# ORDER BY 뒤에 오면 DESC는 알아서 descending으로 인식됨.
# asc는 ascending
SELECT * FROM city WHERE Population>8000000 
	ORDER BY Population DESC;


# 한국의 도시를 district는 오름차순, name도 오름차순
SELECT * FROM city WHERE CountryCode='KOR' 
ORDER BY District, `Name`;

# 광역시도별로 도시 인구수가 많은 것부터 보여주기
# 한국의 도시를 district는 오름차순, 인구수는 내림차순
SELECT * FROM city WHERE CountryCode='KOR' 
ORDER BY District, Population DESC; 

# 함수
# count(*) - 건수. 한국의 도시 개수
SELECT COUNT(*) FROM city WHERE CountryCode='KOR';


# 한국의 인구수
SELECT SUM(Population) FROM city WHERE CountryCode='KOR';
# 평균
SELECT AVG(Population) FROM city WHERE CountryCode='KOR';


# Aliasing - 출력 화면의 칼럼명 변경
SELECT AVG(Population) AS average FROM city WHERE CountryCode='KOR';

# max min avg 다 있음
SELECT MAX(Population), MIN(Population), AVG(Population) FROM city WHERE CountryCode='KOR'

# 광역시도별 인구수를 내림차순으로
SELECT district, SUM(Population) FROM city WHERE CountryCode='KOR'
	GROUP BY District ORDER BY SUM(Population) DESC;

# 전라남도의 도시
SELECT GROUP_CONCAT(NAME) FROM city WHERE District='Chollanam';

# 한국의 광역시도
SELECT GROUP_CONCAT(DISTINCT district) FROM city WHERE CountryCode='KOR';

# 광역시도별 도시의 개수
SELECT district, COUNT(*) FROM city WHERE CountryCode='KOR'
	GROUP BY district ORDER BY COUNT(*) DESC, district;


# 광역시도별 도시의 개수가 5개 이상을 내림차순으로 정렬
SELECT district, COUNT(*) AS `count` FROM city WHERE CountryCode='KOR'
	GROUP BY district HAVING COUNT(*)>=5 ORDER BY COUNT(*) DESC;


# 도시의 개수가 100개 이상인 국가를 도시개수 내림차순으로 정렬
SELECT CountryCode, COUNT(*) FROM city 
    GROUP BY CountryCode HAVING COUNT(*)>=100 ORDER BY COUNT(*) DESC;

# 도시의 개수가 많은 5개 나라
SELECT CountryCode, COUNT(*) FROM city 
	GROUP BY CountryCode ORDER BY COUNT(*) DESC LIMIT 5;

# 도시의 인구가 많은 10개 국가 코드
SELECT CountryCode, sum(Population) FROM city 
	GROUP BY CountryCode ORDER BY sum(Population) DESC 
	LIMIT 10;

# 도시의 인구가 많은 6~10위 국가 코드
SELECT CountryCode, sum(Population) FROM city 
	GROUP BY CountryCode ORDER BY sum(Population) DESC 
	LIMIT 5 OFFSET 5;
    # 5개를 건너뛴 다음 5개. 6~10위