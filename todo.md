# Architektúra 
    MEAN stack

    Készítek egy single page applicationt (spa), amit majd átadok az frontendnek

    Lényegében egy egyszerű api kell a többit rábizom a frontendre

    Az egész backend egy egyszerű api lesz, ami küld json file-okat a front-end-nek(angular)
    
    Az SPA hátránya, hogy nem találják meg jól a crawling rendszerek. Mivel az egész egy json file-t és egy js scriptet ad át, amiket nem néznek meg az indexelők, ezért nem fogják tudni besorolni az oldalt. 

    Ez akkor hátrány, ha azt szeretném hogy a publikum használja. De én ezt úgy gondolom, hogy mivel elsősorban a tanárok fogják befolyásolni az oldal működését, ezért egyeltalán nem fontos számomra, hogy random keresgélve többen találjanak rá az oldalra. Egyedül a tanárokat kell valahogy megszerezni.

# Feladat pontos meghatározása

## Entitások
    - Megrendelés
        - partner
        - Termék lista
        - dátum
        - végösszeg
        - status (dummy eseménykezelés)

    - Raktár
        - Név
        - Cím
        - Raktárfelelős
        - Raktár elem lista
        - utolsó leltár dátuma

    - RaktárElem
        - Raktár
        - Termék
        - Mennyiség jelző
        - Mennyiség

    - Partner
        - Partner neve
        - Cím
        - Kapcsolattartó email
        - kapcsolattartó telefon

    - Termék
        - Termék neve
        - Cikkszám
        - Ár

Vagy így szétbontva
vagy egybepakolva
végülis nem bánt senkit, csak renderelésnél jobban oda kell figyelni, hogy mit küldünk milyen oldalra
### Megrendelés:
    - Ezt küldik el emailben
    - Elemek
    | Név | Megjegyzés|
    |---|---|
    

## Funkciók



## Oldalak 

    1. Lista az összes kurzusról, filterezhetően 
    1. Egy kurzus nézete
    1. Hallgatók nézete
    1. Tanár nézete kurzusról
    1. hallgató személyes oldala

|collection| Screen | URL path|
|---|---|---|
|Courses| List of Courses| / |
|Courses| Course detail | /course |
|Courses | hehexd | | 


Journal
***************************************************************************

npm insatll --save flag : elmentjük a dependencialistába a csomag nevét 

Sok deprecated file van, ezeket majd ki kell bogozni a végén, tényleg régi az ubuntu repós node

csináltam egy app_server nevű mappát ahova betettem négy mappát, a views,routes, és a két létrehozott, controllers, és modell mappát 

ezzel szétválogatjuk a mvc szerint az elemeket

Feladatkörök:
    - route : controller -> app logic route-> url request -> controller


res.render -> view template-et fordítja át a megadott adatok alapján

amit a module.exports-ba beleteszek azt fogja átadni am ásik fájlnak

az még kérdés hogy hogyan lehet beinclude-olni jquery-t és a poppert bootstraphez
már nem kérdés, a rel linkeket '/'-el kell kezdeni hogy a public mappától induljunk

ha nem veszek levegőt akkor jó 



mongodb ha nincs adatbázis, akkor létrehoz egyet, így nincs fejfájás

mongoose leegyszerűsíti a kapcsolatot a webszerver és adatbázis között

## Course api 

|Action| Method | URL path | Parameters | Example
|---|---|---|---|---|
|Create new course | POST | /courses | |  http://learnify.com/api/locations|
|Read list of courses | GET | /courses | 
| Read specific course detail | GET | /courses| courseID   
| Update specific course | PUT | /courses | courseID ||
|Delete specific course | DELETE | /courses| courseID||

## CourseItem api
|Action| Method | URL path | Parameters | Example
|---|---|---|---|---|
|

## User api 
Test course id 

5c61d8e044d8832a1f91bb18

Create and Get done one most course, courseItem elements, i know how to handle subdocuments.

Todo: write every request method 



Megnézi a bme-n a tárgykövetelményt, aszerint szétvágja a segédanyagokat és segít a felkészülésben. 
## API

- [x] Schemas
- [ ] Controllers
- [ ] Routes

## Consuming api
## Angular

Forgot to push on computer so i can't finish the inner api, so instead i consume the product api and create the frontend for it 