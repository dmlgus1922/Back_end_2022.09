/* 
테이블 조인

inner join - 가장 기본적인 것. 교집합
*/

# 인구가 많은 전세계 도시 Top10의 국가명, 도시명, 인구수
SELECT country.Name, city.name, city.population FROM city
	JOIN country ON city.CountryCode = country.Code
	ORDER BY city.Population DESC LIMIT 10;



# 연습문제

# 대륙별로 국가숫자, GNP의 합, 평균 국가별 GNP는?
SELECT continent, COUNT(*), SUM(GNP),AVG(gnp) FROM country 
	GROUP BY Continent;


# 아시아 대륙에서 인구가 가장 많은 도시 10개를 내림차순으로 보여줄 것 
# (대륙명, 국가명, 도시명, 인구수)
SELECT country.Continent, country.Name, city.District, city.Population
	FROM city
	JOIN country ON city.CountryCode = country.Code
	WHERE country.Continent='Asia'
	ORDER BY city.Population DESC LIMIT 10;


# 전 세계에서 인구가 가장 많은 10개 도시에서 사용하는 공식언어는?
# (도시명, 인구수, 언어명)
SELECT city.district, city.Population, countrylanguage.`Language`
	FROM city
	JOIN countrylanguage ON city.CountryCode=countrylanguage.CountryCode
	GROUP BY city.District
	ORDER BY city.population DESC LIMIT 10;