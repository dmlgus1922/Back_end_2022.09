/* 
테이블 조인

inner join - 가장 기본적인 것. 교집합
*/

# 인구가 많은 전세계 도시 Top10의 국가명, 도시명, 인구수
SELECT country.Name, city.name, city.population FROM city
	JOIN country ON city.CountryCode = country.Code
	ORDER BY city.Population DESC LIcountryMIT 10;