'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots';

const data = [
  {"ownerId":3,"address":"PO Box 8915","city":"Itzig","country":"Luxembourg","lat":49.5872019,"lng":6.1781675,"name":"Effertz, Casper and Kris","description":"Carbuncle of left axilla","price":3195.26},
  {"ownerId":2,"address":"Room 926","city":"Imider","country":"Morocco","lat":31.3694559,"lng":-5.7905653,"name":"Purdy-Schowalter","description":"Inj unsp blood vess at abdomen, lower back and pelvis level","price":7425.52},
  {"ownerId":3,"address":"6th Floor","city":"Cekcyn","country":"Poland","lat":53.5733796,"lng":18.0101779,"name":"McGlynn, Koepp and Nitzsche","description":"Acc pnctr & lac of skin, subcu during a dermatologic proc","price":7204.13},
  {"ownerId":3,"address":"Suite 33","city":"La Lima","country":"Honduras","lat":15.4321163,"lng":-87.9040571,"name":"White and Sons","description":"Pressure ulcer of unspecified elbow, unstageable","price":3579.34},
  {"ownerId":2,"address":"Room 1480","city":"Fuxing","country":"China","lat":36.639033,"lng":114.462061,"name":"Dickens Group","description":"Milt op involving unintent restriction of air/airwy, milt","price":34864.49},
  {"ownerId":2,"address":"1st Floor","city":"Krajan Satu","country":"Indonesia","lat":-7.3743397,"lng":110.2648159,"name":"Lehner Inc","description":"21 weeks gestation of pregnancy","price":4388.31},
  {"ownerId":2,"address":"18th Floor","city":"Casal Novo","state":"Leiria","country":"Portugal","lat":39.6589565,"lng":-8.8073178,"name":"Blick-Von","description":"War op involving acc deton onboard marine weapons, civilian","price":2641.64},
  {"ownerId":1,"address":"PO Box 68498","city":"Pomacanchi","country":"Peru","lat":-14.0359111,"lng":-71.5709117,"name":"Quigley, Howe and McCullough","description":"Falling, jumping or pushed from a high place, undet intent","price":7452.88},
  {"ownerId":1,"address":"4th Floor","city":"Bulihan","country":"Philippines","lat":14.8853727,"lng":120.8986655,"name":"Kohler and Sons","description":"Glaucoma secondary to eye trauma, bilateral, mild stage","price":521210.86},
  {"ownerId":2,"address":"Room 879","city":"Xinpu","country":"China","lat":27.44587,"lng":118.679751,"name":"Stokes Group","description":"Burns of 40-49% of body surface w 20-29% third degree burns","price":786847.56},
  {"ownerId":1,"address":"Apt 376","city":"Shashemenē","country":"Ethiopia","lat":7.1972968,"lng":38.6005328,"name":"Marks and Sons","description":"Hemorrhage from respiratory passages","price":66112.61},
  {"ownerId":3,"address":"PO Box 34466","city":"Cam Ranh","country":"Vietnam","lat":11.893334,"lng":109.1701666,"name":"Wilderman, Hudson and Considine","description":"Inj l int crtd, intcr w LOC >24 hr w ret consc lev, sequela","price":331220.37},
  {"ownerId":3,"address":"Suite 79","city":"Haolin","country":"China","lat":31.859653,"lng":120.558606,"name":"Schneider, Kreiger and Terry","description":"War op w indirect blast effect of nuclear weapon, milt","price":780325.09},
  {"ownerId":3,"address":"Suite 70","city":"Rawa","country":"China","lat":43.6276714,"lng":-79.6306718,"name":"Ledner-Mohr","description":"Complete traumatic amputation at unsp shoulder joint, init","price":907008.24},
  {"ownerId":1,"address":"PO Box 59293","city":"Mercedes","country":"Philippines","lat":14.5634196,"lng":121.0307955,"name":"Beier, Nienow and Graham","description":"Traum hemor left cerebrum w/o loss of consciousness, subs","price":156189.36},
  {"ownerId":2,"address":"Suite 69","city":"Jinshan","country":"China","lat":30.741991,"lng":121.341969,"name":"VonRueden-Jerde","description":"Chronic gout due to renal impairment, left elbow","price":680160.63},
  {"ownerId":3,"address":"Room 1121","city":"Polo","country":"Philippines","lat":14.707895,"lng":120.94639,"name":"Ortiz-Weissnat","description":"Foreign body on external eye, part unsp, right eye, subs","price":205929.08},
  {"ownerId":3,"address":"Apt 299","city":"Novohrad-Volyns’kyy","country":"Ukraine","lat":50.5860203,"lng":27.6363775,"name":"Corkery Inc","description":"Collapsed vertebra, NEC, cervical region","price":107920.52},
  {"ownerId":3,"address":"Room 287","city":"Нераште","country":"Macedonia","lat":42.10667,"lng":21.10889,"name":"Bernier Group","description":"Toxic effect of corrosive organic compounds, assault, init","price":237757.31},
  {"ownerId":1,"address":"14th Floor","city":"Dulovo","country":"Bulgaria","lat":43.7624891,"lng":27.2163113,"name":"Schowalter-Goodwin","description":"Nondisp pilon fx left tibia, subs for clos fx w routn heal","price":787259.73},
  {"ownerId":1,"address":"Room 1584","city":"Acobambilla","country":"Peru","lat":-12.67442,"lng":-75.325157,"name":"Reinger, Okuneva and Thiel","description":"Assault by push/place victim in front of train, init","price":42502.64},
  {"ownerId":1,"address":"Apt 1480","city":"Calibutbut","country":"Philippines","lat":14.9809312,"lng":120.6551147,"name":"Green-Sauer","description":"Abrasion of abdominal wall, sequela","price":310508.81},
  {"ownerId":1,"address":"Apt 861","city":"Comallo","country":"Argentina","lat":-38.9786963,"lng":-67.8126798,"name":"Armstrong Group","description":"Flat anterior chamber hypotony of eye, bilateral","price":421967.2},
  {"ownerId":3,"address":"PO Box 7099","city":"Ushumun","country":"Russia","lat":52.783041,"lng":126.540917,"name":"Dibbert-Considine","description":"Adverse effect of amphetamines","price":444057.89},
  {"ownerId":1,"address":"Room 1342","city":"Liucheng","country":"China","lat":24.651518,"lng":109.24473,"name":"Wehner, Prohaska and Schaden","description":"Unspecified mood [affective] disorder","price":296690.17},
  {"ownerId":3,"address":"19th Floor","city":"Panay","country":"Philippines","lat":14.6101685,"lng":121.0088573,"name":"Lemke, O'Reilly and Denesik","description":"Toxic effect of trichloroethylene, self-harm, init","price":386148.94},
  {"ownerId":2,"address":"PO Box 27339","city":"Kanginan","country":"Indonesia","lat":-7.2576752,"lng":112.7514577,"name":"Weimann LLC","description":"Lac w/o fb of unsp bk wl of thorax w/o penet thoracic cavity","price":198119.91},
  {"ownerId":3,"address":"Apt 922","city":"Zachepylivka","country":"Ukraine","lat":49.193851,"lng":35.2461823,"name":"Klocko Group","description":"Laceration w/o fb of unsp external genital organs, male","price":906017.14},
  {"ownerId":3,"address":"PO Box 12128","city":"Al Ma‘allā’","country":"Yemen","lat":12.78987,"lng":45.00244,"name":"Morissette, Turcotte and Nitzsche","description":"Injury of optic chiasm, initial encounter","price":663011.25},
  {"ownerId":1,"address":"Apt 1821","city":"Loúros","country":"Greece","lat":39.162045,"lng":20.7509566,"name":"White Inc","description":"Instability of internal right knee prosthesis, sequela","price":665468.66},
  {"ownerId":1,"address":"PO Box 17154","city":"Pirapora","country":"Brazil","lat":-17.3410721,"lng":-44.9449465,"name":"Ryan LLC","description":"Displ longitud fx r patella, 7thQ","price":726979.61},
  {"ownerId":1,"address":"6th Floor","city":"Fort Macleod","state":"Alberta","country":"Canada","lat":49.71671,"lng":-113.41857,"name":"Weissnat-Barton","description":"Unspecified injury of innominate or subclavian vein","price":740841.36},
  {"ownerId":1,"address":"Suite 56","city":"Svirsk","country":"Russia","lat":53.0809114,"lng":103.3256193,"name":"Nikolaus Inc","description":"Path fx in oth disease, oth site, subs for fx w routn heal","price":132308.11},
  {"ownerId":3,"address":"Suite 53","city":"Mopipi","country":"Botswana","lat":-21.2001343,"lng":24.8656498,"name":"Reynolds-Morar","description":"Rubella without complication","price":101160.49},
  {"ownerId":1,"address":"PO Box 87961","city":"San Pedro de Macorís","country":"Dominican Republic","lat":18.4581133,"lng":-69.3044885,"name":"Greenholt, Carter and Braun","description":"Monoplg upr lmb fol ntrm subarach hemor aff left dom side","price":561866.11},
  {"ownerId":1,"address":"Suite 71","city":"Fylí","country":"Greece","lat":38.1189564,"lng":23.6561725,"name":"Tillman Group","description":"Strain long flexor musc/fasc/tend l thm at wrs/hnd lv, init","price":729327.37},
  {"ownerId":2,"address":"Suite 41","city":"Linshui","country":"China","lat":30.334768,"lng":106.93038,"name":"Bergstrom and Sons","description":"Displ bimalleol fx l low leg, subs for clos fx w delay heal","price":987081.58},
  {"ownerId":2,"address":"PO Box 62641","city":"Velingrad","country":"Bulgaria","lat":42.0275439,"lng":23.9915523,"name":"Collier-Howell","description":"Discoid lupus erythematosus of right lower eyelid","price":939426.58},
  {"ownerId":1,"address":"Suite 59","city":"Guarenas","country":"Venezuela","lat":10.4662629,"lng":-66.6168821,"name":"Little-Stanton","description":"Iliac crest spur, right hip","price":852441.78},
  {"ownerId":3,"address":"10th Floor","city":"Shitan","country":"China","lat":27.754532,"lng":112.723615,"name":"Quitzon-Rodriguez","description":"Poisoning by androgens and anabolic congeners, assault","price":292000.77},
  {"ownerId":3,"address":"Apt 1132","city":"Dinahican","country":"Philippines","lat":14.714943,"lng":121.712226,"name":"Kutch-Little","description":"Drowning and submersion due to unpowr wtrcrft overturning","price":440171.41},
  {"ownerId":2,"address":"PO Box 60998","city":"Chacapalpa","country":"Peru","lat":-11.72447,"lng":-75.773888,"name":"Steuber LLC","description":"Maternal care for excess fetal growth, first tri, fetus 4","price":453207.42},
  {"ownerId":3,"address":"Apt 809","city":"Maumbawa","country":"Indonesia","lat":-8.738072,"lng":118.1171082,"name":"Heidenreich-Bergnaum","description":"Unspecified open wound of right wrist","price":227597.56},
  {"ownerId":2,"address":"Suite 91","city":"Yamaguchi-shi","country":"Japan","lat":34.0899029,"lng":131.3980655,"name":"Ernser, Kris and Daugherty","description":"Burn of unspecified degree of nose (septum), sequela","price":140775.94},
  {"ownerId":1,"address":"PO Box 50962","city":"Krajan Satu","country":"Indonesia","lat":-7.3743397,"lng":110.2648159,"name":"Nader, Lind and Doyle","description":"Other physeal fracture of upper end of humerus, right arm","price":837388.27},
  {"ownerId":2,"address":"17th Floor","city":"Pasir Mas","state":"Kelantan","country":"Malaysia","lat":6.1090652,"lng":102.133622,"name":"Von, Hahn and Towne","description":"Smith's fx r rad, subs for opn fx type 3A/B/C w delay heal","price":230666.78},
  {"ownerId":3,"address":"Apt 260","city":"Raniżów","country":"Poland","lat":50.2709514,"lng":22.0218252,"name":"Hyatt, Swift and Shields","description":"Other dystrophies primarily involving the sensory retina","price":507238.9},
  {"ownerId":3,"address":"PO Box 66814","city":"La Clotilde","country":"Argentina","lat":-26.8268706,"lng":-65.2705688,"name":"O'Kon-Schneider","description":"Other fracture of third metacarpal bone, left hand","price":498293.18},
  {"ownerId":1,"address":"Suite 73","city":"Laguna Limpia","country":"Argentina","lat":-27.581232,"lng":-58.7426968,"name":"Renner-Larson","description":"Periprosth osteolys of internal prosthetic l hip jt, sequela","price":981830.07},
  {"ownerId":2,"address":"Suite 10","city":"Yoshida-kasugachō","country":"Japan","lat":37.6837922,"lng":138.8825459,"name":"Kshlerin-Koelpin","description":"Plasmodium falciparum malaria","price":152665.66},
  {"ownerId":1,"address":"Apt 1575","city":"Stenungsund","state":"Västra Götaland","country":"Sweden","lat":58.0498372,"lng":11.8515576,"name":"Welch Group","description":"Displaced oblique fracture of shaft of unsp femur, sequela","price":587205.0},
  {"ownerId":2,"address":"Apt 1199","city":"Spas-Klepiki","country":"Russia","lat":55.1328637,"lng":40.17768,"name":"Jast-Pouros","description":"Exfoliative dermatitis","price":957142.68},
  {"ownerId":2,"address":"9th Floor","city":"Yelwa","country":"Nigeria","lat":10.8370155,"lng":4.7432763,"name":"Hickle-Harber","description":"Other chronic nonsuppurative otitis media, right ear","price":572746.39},
  {"ownerId":2,"address":"PO Box 55501","city":"Bobon","country":"Philippines","lat":12.5200531,"lng":124.5372661,"name":"Wintheiser Group","description":"Oth osteopor w crnt path fx, l shldr, 7thD","price":107902.96},
  {"ownerId":1,"address":"Suite 62","city":"Dzhetygara","country":"Kazakhstan","lat":52.2163528,"lng":61.2809373,"name":"Ryan-Runte","description":"Unspecified pre-eclampsia, complicating childbirth","price":147136.93},
  {"ownerId":3,"address":"Room 1523","city":"Binangun","country":"Indonesia","lat":-8.2127777,"lng":112.3456985,"name":"Franecki-Hyatt","description":"Failed or difficult intubation for anesth during pregnancy","price":232025.13},
  {"ownerId":3,"address":"Apt 583","city":"Pojan","country":"Albania","lat":40.7273859,"lng":20.8344302,"name":"Brekke, Legros and Nienow","description":"Condctv hear loss, uni, left ear with rstrcd hear cntra side","price":137171.79},
  {"ownerId":3,"address":"Apt 1069","city":"Formiga","country":"Brazil","lat":-20.5923566,"lng":-45.4874873,"name":"Anderson-Okuneva","description":"War op involving explosion of torpedo, civilian, sequela","price":652077.44},
  {"ownerId":3,"address":"Apt 1731","city":"Margahayukencana","country":"Indonesia","lat":-6.9714991,"lng":107.569381,"name":"Jones, Considine and Rice","description":"Galeazzi's fracture of left radius, init for clos fx","price":138864.84},
  {"ownerId":3,"address":"1st Floor","city":"Houjia","country":"China","lat":37.020948,"lng":122.093267,"name":"Roob, Leffler and Stoltenberg","description":"Contracture, right foot","price":378816.58},
  {"ownerId":1,"address":"14th Floor","city":"Choros","country":"Peru","lat":-5.896111,"lng":-78.690278,"name":"Hoppe and Sons","description":"Accidental twist by another person, initial encounter","price":35875.29},
  {"ownerId":1,"address":"Suite 41","city":"Datang","country":"China","lat":29.693316,"lng":120.167774,"name":"Legros-Kunze","description":"Oth injuries of left shoulder and upper arm, init encntr","price":892176.47},
  {"ownerId":2,"address":"Room 1407","city":"Tianning","country":"China","lat":31.779618,"lng":119.974991,"name":"Brakus, Hessel and Schmidt","description":"Complete oblique atypical femoral fracture, unsp leg, 7thD","price":726861.69},
  {"ownerId":2,"address":"Apt 1480","city":"Tuanshan","country":"China","lat":33.195993,"lng":105.606648,"name":"Stehr Inc","description":"Poisoning by immunoglobulin, intentional self-harm, init","price":836165.79},
  {"ownerId":2,"address":"Apt 1056","city":"Hovås","state":"Västra Götaland","country":"Sweden","lat":57.6073069,"lng":11.9770405,"name":"Larkin, Trantow and Crist","description":"Dislocation of unsp interphaln joint of l rng fngr, subs","price":590621.04},
  {"ownerId":3,"address":"PO Box 56848","city":"Bennäs","country":"Finland","lat":63.6182729,"lng":22.7568858,"name":"Mueller, Runolfsdottir and Rolfson","description":"Hypoesthesia of skin","price":180532.0},
  {"ownerId":1,"address":"Room 529","city":"La Asunción","country":"Venezuela","lat":11.028458,"lng":-63.8581485,"name":"Stracke and Sons","description":"Pnctr w/o fb of unsp great toe w damage to nail, sequela","price":915443.44},
  {"ownerId":3,"address":"Suite 46","city":"Qal‘at al Andalus","country":"Tunisia","lat":37.066667,"lng":10.116667,"name":"Beahan, O'Connell and Beer","description":"Contracture, right elbow","price":449694.99},
  {"ownerId":1,"address":"Apt 1988","city":"Moravská Třebová","country":"Czech Republic","lat":49.7575973,"lng":16.6635314,"name":"Ortiz and Sons","description":"Displaced dome fx right talus, subs for fx w nonunion","price":844054.36},
  {"ownerId":1,"address":"Room 1309","city":"Yangdi","country":"China","lat":24.9938893,"lng":110.4541138,"name":"Legros Inc","description":"Other specified congenital malformations of ear","price":287457.3},
  {"ownerId":1,"address":"Room 146","city":"Baisha","country":"China","lat":26.641315,"lng":100.222545,"name":"Pfannerstill Inc","description":"Legal intervnt involving oth sharp objects, suspect injured","price":628483.53},
  {"ownerId":3,"address":"PO Box 5661","city":"Motema","country":"Sierra Leone","lat":8.550734,"lng":-11.352539,"name":"Hickle, Tremblay and Reinger","description":"Fall into natural body of water strk bottom causing drown","price":760279.94},
  {"ownerId":3,"address":"Room 914","city":"Åby","state":"Östergötland","country":"Sweden","lat":58.6527772,"lng":16.1834327,"name":"Romaguera and Sons","description":"Saccadic eye movements","price":314818.91},
  {"ownerId":1,"address":"Apt 148","city":"Satowebrang","country":"Indonesia","lat":-8.416,"lng":117.1266,"name":"Pacocha LLC","description":"Unsp fx shaft of right femur, subs for clos fx w routn heal","price":179228.76},
  {"ownerId":1,"address":"Suite 53","city":"Áno Kalentíni","country":"Greece","lat":39.2476884,"lng":21.1614231,"name":"Schumm LLC","description":"Drown d/t thrown ovrbrd by motion of power wtrcrft, sqla","price":103795.67},
  {"ownerId":3,"address":"PO Box 60884","city":"Morshansk","country":"Russia","lat":53.4428794,"lng":41.8125556,"name":"Harber-Osinski","description":"Partial traum amp of left hip and thigh, level unsp, sequela","price":553803.11},
  {"ownerId":2,"address":"Apt 1031","city":"Sarov","country":"Russia","lat":54.920665,"lng":43.347223,"name":"Skiles-Hand","description":"Acute gastric ulcer with perforation","price":98757.43},
  {"ownerId":2,"address":"Room 1473","city":"Ōzu","country":"Japan","lat":32.8872867,"lng":130.8841776,"name":"Ledner-Herman","description":"Breakdown (mechanical) of int fix of unsp bone of limb, init","price":760807.27},
  {"ownerId":1,"address":"PO Box 50152","city":"Jingmen","country":"China","lat":31.035395,"lng":112.199427,"name":"Predovic, Moen and Heathcote","description":"Umbilical hernia without obstruction or gangrene","price":368618.28},
  {"ownerId":3,"address":"12th Floor","city":"Ḩalabjah","country":"Iraq","lat":35.1654999,"lng":45.9896078,"name":"O'Kon Group","description":"Superficial frostbite of right knee and lower leg, sequela","price":967486.93},
  {"ownerId":2,"address":"Room 1767","city":"Tyoply Stan","country":"Russia","lat":55.6042276,"lng":37.4919828,"name":"Erdman Inc","description":"Evidence of alcohol involv determined by blood alcohol level","price":100039.25},
  {"ownerId":3,"address":"PO Box 28008","city":"Weihai","country":"China","lat":37.513068,"lng":122.120419,"name":"Jerde LLC","description":"Pasngr in pk-up/van injured in clsn w unsp mv nontraf, subs","price":605492.51},
  {"ownerId":1,"address":"Suite 86","city":"Thị Trấn Vạn Hà","country":"Vietnam","lat":19.8829688,"lng":105.6791207,"name":"Lockman, Larkin and Dickinson","description":"Torus fx lower end of left fibula, subs for fx w delay heal","price":441889.06},
  {"ownerId":3,"address":"Apt 1721","city":"Apartadó","country":"Colombia","lat":7.882761,"lng":-76.624692,"name":"Christiansen Inc","description":"Corrosion of second degree of knee","price":941879.7},
  {"ownerId":1,"address":"PO Box 79130","city":"Mobile","state":"Alabama","country":"United States","lat":30.7,"lng":-88.11,"name":"Wehner Inc","description":"Nondisp fx of neck of left talus, subs for fx w malunion","price":721618.37},
  {"ownerId":3,"address":"Room 829","city":"Long Beluah","country":"Indonesia","lat":2.731033,"lng":117.1147095,"name":"Goldner-White","description":"Mech compl of esophageal anti-reflux device, subs encntr","price":475035.99},
  {"ownerId":3,"address":"2nd Floor","city":"Lyozna","country":"Belarus","lat":55.024145,"lng":30.8005553,"name":"McGlynn LLC","description":"Unsp fx the low end unsp rad, 7thH","price":191970.94},
  {"ownerId":2,"address":"3rd Floor","city":"Baratã","state":"Lisboa","country":"Portugal","lat":38.80549,"lng":-9.3277081,"name":"Daniel, Haley and Hane","description":"Disp fx of first metatarsal bone, unspecified foot","price":769399.87},
  {"ownerId":3,"address":"14th Floor","city":"Kole","country":"Uganda","lat":2.3030748,"lng":32.7633036,"name":"Predovic-Ritchie","description":"Pathological fracture, left toe(s), subs for fx w routn heal","price":752731.36},
  {"ownerId":1,"address":"Room 1963","city":"Manamrag","country":"Philippines","lat":13.7362437,"lng":124.1066725,"name":"Moore-Daniel","description":"Unsp physl fx upper end of l fibula, subs for fx w malunion","price":505091.71},
  {"ownerId":1,"address":"Suite 21","city":"Uthai","country":"Thailand","lat":14.3618606,"lng":100.6685901,"name":"Hettinger-Fahey","description":"Inj intrinsic musc/fasc/tend thmb at wrs/hnd lv, subs","price":482487.85},
  {"ownerId":2,"address":"Apt 1180","city":"Chitose","country":"Japan","lat":38.282236,"lng":140.3411789,"name":"Smith, Cole and Crooks","description":"Subluxation of midcarpal joint of unsp wrist, init encntr","price":883770.95},
  {"ownerId":2,"address":"20th Floor","city":"Bichena","country":"Ethiopia","lat":10.4477737,"lng":38.2031762,"name":"Armstrong Group","description":"Unsp fracture of facial bones, subs for fx w delay heal","price":735792.15},
  {"ownerId":3,"address":"Suite 47","city":"London","state":"England","country":"United Kingdom","lat":51.5142805,"lng":-0.1284654,"name":"Zemlak, Ward and Purdy","description":"Bitten by shark, subsequent encounter","price":798748.76},
  {"ownerId":1,"address":"6th Floor","city":"Luorong","country":"China","lat":23.320477,"lng":111.2138,"name":"Miller, Littel and MacGyver","description":"Longitudinal vaginal septum, obstructing, left side","price":875703.73},
  {"ownerId":1,"address":"20th Floor","city":"Xinyuan","country":"China","lat":43.42993,"lng":83.26077,"name":"Gleichner Group","description":"Displ subtrochnt fx l femur, subs for clos fx w routn heal","price":249526.88},
  {"ownerId":3,"address":"Apt 728","city":"Staropyshminsk","country":"Russia","lat":56.9362366,"lng":60.8962022,"name":"Murray Group","description":"Maternal care for damage to fetus by radiation, unsp","price":727089.37},
  {"ownerId":3,"address":"Room 302","city":"Novovoronezh","country":"Russia","lat":51.3531567,"lng":39.3015305,"name":"Bartoletti-Lind","description":"Contusion of right middle finger with damage to nail","price":899717.11},
  {"ownerId":3,"address":"Apt 1718","city":"Kitāf","country":"Yemen","lat":17.037629,"lng":44.1221682,"name":"Heidenreich and Sons","description":"Underdosing of other narcotics","price":365651.01},
  {"ownerId":2,"address":"PO Box 64190","city":"Hägersten","state":"Stockholm","country":"Sweden","lat":59.3015113,"lng":17.9981495,"name":"Okuneva, Quitzon and Romaguera","description":"Nondisp fx of intermed cuneiform of l ft, 7thP","price":841054.83},
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options.tableName, data, {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options.tableName, null, {});
  },
};
