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