<script setup lang="ts">
import BreadCrumbs from 'src/components/Buyer/BreadCrumbs.vue';
import { useAuthStore } from 'src/stores/Authentication';
import { computed, inject, onMounted, reactive, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCartStore } from 'src/stores/cart';

const $q = useQuasar();
const router = useRouter();
const { Cart, total_price } = storeToRefs(useCartStore());
// const { isLoggedIn } = storeToRefs(useAuthStore());
const api = inject('api');

const delivery_price = 2500
const tax = 150
const sumAmount = computed(() => delivery_price + tax + total_price.value)
const isLoading = ref(false)

const states = [
  {
    code: 'FC',
    name: 'Abuja',
    capital: '',
    lat: '8.831122799397733',
    long: '7.172467300000001',
    lgas: ['Abuja', 'Kwali', 'Kuje', 'Gwagwalada', 'Bwari', 'Abaji'],
  },
  {
    code: 'AB',
    name: 'Abia',
    capital: 'Umuahia',
    lat: '5.45409529947607',
    long: '7.5153071',
    lgas: [
      'Aba North',
      'Aba South',
      'Arochukwu',
      'Bende',
      'Ikawuno',
      'Ikwuano',
      'Isiala-Ngwa North',
      'Isiala-Ngwa South',
      'Isuikwuato',
      'Umu Nneochi',
      'Obi Ngwa',
      'Obioma Ngwa',
      'Ohafia',
      'Ohaozara',
      'Osisioma',
      'Ugwunagbo',
      'Ukwa West',
      'Ukwa East',
      'Umuahia North',
      'Umuahia South',
    ],
  },
  {
    code: 'AD',
    name: 'Adamawa',
    capital: 'Yola',
    lat: '9.512977199417053',
    long: '12.388188699999999',
    lgas: [
      'Demsa',
      'Fufore',
      'Ganye',
      'Girei',
      'Gombi',
      'Guyuk',
      'Hong',
      'Jada',
      'Lamurde',
      'Madagali',
      'Maiha',
      'Mayo-Belwa',
      'Michika',
      'Mubi-North',
      'Mubi-South',
      'Numan',
      'Shelleng',
      'Song',
      'Toungo',
      'Yola North',
      'Yola South',
    ],
  },
  {
    code: 'AK',
    name: 'AkwaIbom',
    capital: 'Uyo',
    lat: '4.940863799511036',
    long: '7.8412267',
    lgas: [
      'Abak',
      'Eastern-Obolo',
      'Eket',
      'Esit-Eket',
      'Essien-Udim',
      'Etim-Ekpo',
      'Etinan',
      'Ibeno',
      'Ibesikpo-Asutan',
      'Ibiono-Ibom',
      'Ika',
      'Ikono',
      'Ikot-Abasi',
      'Ikot-Ekpene',
      'Ini',
      'Itu',
      'Mbo',
      'Mkpat-Enin',
      'Nsit-Atai',
      'Nsit-Ibom',
      'Nsit-Ubium',
      'Obot-Akara',
      'Okobo',
      'Onna',
      'Oron',
      'Oruk Anam',
      'Udung-Uko',
      'Ukanafun',
      'Urue-Offong/Oruko',
      'Uruan',
      'Uyo',
    ],
  },
  {
    code: 'AN',
    name: 'Anambra',
    capital: 'Awka',
    lat: '6.2183135994341985',
    long: '6.9531842',
    lgas: [
      'Aguata',
      'Anambra East',
      'Anambra West',
      'Anaocha',
      'Awka North',
      'Awka South',
      'Ayamelum',
      'Dunukofia',
      'Ekwusigo',
      'Idemili-North',
      'Idemili-South',
      'Ihiala',
      'Njikoka',
      'Nnewi-North',
      'Nnewi-South',
      'Ogbaru',
      'Onitsha-North',
      'Onitsha-South',
      'Orumba-North',
      'Orumba-South',
    ],
  },
  {
    code: 'BA',
    name: 'Bauchi',
    capital: 'Bauchi',
    lat: '10.622828399473097',
    long: '10.028775399999999',
    lgas: [
      'Alkaleri',
      'Bauchi',
      'Bogoro',
      'Damban',
      'Darazo',
      'Dass',
      'Gamawa',
      'Ganjuwa',
      'Giade',
      'Itas Gadau',
      "Jama'Are",
      'Katagum',
      'Kirfi',
      'Misau',
      'Ningi',
      'Shira',
      'Tafawa-Balewa',
      'Toro',
      'Warji',
      'Zaki',
    ],
  },
  {
    code: 'BY',
    name: 'Bayelsa',
    capital: 'Yenagoa',
    lat: '4.762978599524332',
    long: '6.028898',
    lgas: [
      'Brass',
      'Ekeremor',
      'Kolokuma Opokuma',
      'Nembe',
      'Ogbia',
      'Sagbama',
      'Southern-Ijaw',
      'Yenagoa',
    ],
  },
  {
    code: 'BE',
    name: 'Benue',
    capital: 'Makurdi',
    lat: '7.35057469939717',
    long: '8.777287699999999',
    lgas: [
      'Ado',
      'Agatu',
      'Apa',
      'Buruku',
      'Gboko',
      'Guma',
      'Gwer-East',
      'Gwer-West',
      'Katsina-Ala',
      'Konshisha',
      'Kwande',
      'Logo',
      'Makurdi',
      'Ogbadibo',
      'Ohimini',
      'Oju',
      'Okpokwu',
      'Otukpo',
      'Tarka',
      'Ukum',
      'Ushongo',
      'Vandeikya',
    ],
  },
  {
    code: 'BO',
    name: 'Borno',
    capital: 'Maiduguri',
    lat: '12.18753919959776',
    long: '13.308003399999999',
    lgas: [
      'Abadam',
      'Askira-Uba',
      'Bama',
      'Bayo',
      'Biu',
      'Chibok',
      'Damboa',
      'Dikwa',
      'Gubio',
      'Guzamala',
      'Gwoza',
      'Hawul',
      'Jere',
      'Kaga',
      'Kala Balge',
      'Konduga',
      'Kukawa',
      'Kwaya-Kusar',
      'Mafa',
      'Magumeri',
      'Maiduguri',
      'Marte',
      'Mobbar',
      'Monguno',
      'Ngala',
      'Nganzai',
      'Shani',
    ],
  },
  {
    code: 'CR',
    name: 'CrossRiver',
    capital: 'Calabar',
    lat: '5.867196599451846',
    long: '8.5204774',
    lgas: [
      'Abi',
      'Akamkpa',
      'Akpabuyo',
      'Bakassi',
      'Bekwarra',
      'Biase',
      'Boki',
      'Calabar-Municipal',
      'Calabar-South',
      'Etung',
      'Ikom',
      'Obanliku',
      'Obubra',
      'Obudu',
      'Odukpani',
      'Ogoja',
      'Yakurr',
      'Yala',
    ],
  },
  {
    code: 'DE',
    name: 'Delta',
    capital: 'Asaba',
    lat: '5.527306099471514',
    long: '6.178416699999999',
    lgas: [
      'Aniocha North',
      'Aniocha-North',
      'Aniocha-South',
      'Bomadi',
      'Burutu',
      'Ethiope-East',
      'Ethiope-West',
      'Ika-North-East',
      'Ika-South',
      'Isoko-North',
      'Isoko-South',
      'Ndokwa-East',
      'Ndokwa-West',
      'Okpe',
      'Oshimili-North',
      'Oshimili-South',
      'Patani',
      'Sapele',
      'Udu',
      'Ughelli-North',
      'Ughelli-South',
      'Ukwuani',
      'Uvwie',
      'Warri South-West',
      'Warri North',
      'Warri South',
    ],
  },
  {
    code: 'EB',
    name: 'Ebonyi',
    capital: 'Abakaliki',
    lat: '6.199691799435065',
    long: '8.0348906',
    lgas: [
      'Abakaliki',
      'Afikpo-North',
      'Afikpo South (Edda)',
      'Ebonyi',
      'Ezza-North',
      'Ezza-South',
      'Ikwo',
      'Ishielu',
      'Ivo',
      'Izzi',
      'Ohaukwu',
      'Onicha',
    ],
  },
  {
    code: 'ED',
    name: 'Edo',
    capital: 'Benin City',
    lat: '6.607657499417959',
    long: '5.9722713',
    lgas: [
      'Akoko Edo',
      'Egor',
      'Esan-Central',
      'Esan-North-East',
      'Esan-South-East',
      'Esan-West',
      'Etsako-Central',
      'Etsako-East',
      'Etsako-West',
      'Igueben',
      'Ikpoba-Okha',
      'Oredo',
      'Orhionmwon',
      'Ovia-North-East',
      'Ovia-South-West',
      'Owan East',
      'Owan-West',
      'Uhunmwonde',
    ],
  },
  {
    code: 'EK',
    name: 'Ekiti',
    capital: 'Ado-Ekiti',
    lat: '7.736890999391845',
    long: '5.2738326',
    lgas: [
      'Ado-Ekiti',
      'Efon',
      'Ekiti-East',
      'Ekiti-South-West',
      'Ekiti-West',
      'Emure',
      'Gbonyin',
      'Ido-Osi',
      'Ijero',
      'Ikere',
      'Ikole',
      'Ilejemeje',
      'Irepodun Ifelodun',
      'Ise-Orun',
      'Moba',
      'Oye',
    ],
  },
  {
    code: 'EN',
    name: 'Enugu',
    capital: 'Enugu',
    lat: '6.553609399419997',
    long: '7.4143061',
    lgas: [
      'Aninri',
      'Awgu',
      'Enugu-East',
      'Enugu-North',
      'Enugu-South',
      'Ezeagu',
      'Igbo-Etiti',
      'Igbo-Eze-North',
      'Igbo-Eze-South',
      'Isi-Uzo',
      'Nkanu-East',
      'Nkanu-West',
      'Nsukka',
      'Oji-River',
      'Udenu',
      'Udi',
      'Uzo-Uwani',
    ],
  },
  {
    code: 'GO',
    name: 'Gombe',
    capital: 'Gombe',
    lat: '10.383009999458512',
    long: '11.206567',
    lgas: [
      'Akko',
      'Balanga',
      'Billiri',
      'Dukku',
      'Funakaye',
      'Gombe',
      'Kaltungo',
      'Kwami',
      'Nafada',
      'Shongom',
      'Yamaltu Deba',
    ],
  },
  {
    code: 'IM',
    name: 'Imo',
    capital: 'Owerri',
    lat: '5.585945599467946',
    long: '7.0669651',
    lgas: [
      'Aboh-Mbaise',
      'Ahiazu-Mbaise',
      'Ehime-Mbano',
      'Ezinihitte',
      'Ideato-North',
      'Ideato-South',
      'Ihitte Uboma',
      'Ikeduru',
      'Isiala-Mbano',
      'Isu',
      'Mbaitoli',
      'Ngor-Okpala',
      'Njaba',
      'Nkwerre',
      'Nwangele',
      'Obowo',
      'Oguta',
      'Ohaji-Egbema',
      'Okigwe',
      'Onuimo',
      'Orlu',
      'Orsu',
      'Oru-East',
      'Oru-West',
      'Owerri-Municipal',
      'Owerri-North',
      'Owerri-West',
    ],
  },
  {
    code: 'JI',
    name: 'Jigawa',
    capital: 'Dutse',
    lat: '12.325236199610885',
    long: '9.510329599999999',
    lgas: [
      'Auyo',
      'Babura',
      'Biriniwa',
      'Birnin-Kudu',
      'Buji',
      'Dutse',
      'Gagarawa',
      'Garki',
      'Gumel',
      'Guri',
      'Gwaram',
      'Gwiwa',
      'Hadejia',
      'Jahun',
      'Kafin-Hausa',
      'Kaugama',
      'Kazaure',
      'Kiri kasama',
      'Maigatari',
      'Malam Madori',
      'Miga',
      'Ringim',
      'Roni',
      'Sule-Tankarkar',
      'Taura',
      'Yankwashi',
    ],
  },
  {
    code: 'KD',
    name: 'Kaduna',
    capital: 'Kaduna',
    lat: '10.382531799458487',
    long: '7.853322600000001',
    lgas: [
      'Birnin-Gwari',
      'Chikun',
      'Giwa',
      'Igabi',
      'Ikara',
      'Jaba',
      "Jema'A",
      'Kachia',
      'Kaduna-North',
      'Kaduna-South',
      'Kagarko',
      'Kajuru',
      'Kaura',
      'Kauru',
      'Kubau',
      'Kudan',
      'Lere',
      'Makarfi',
      'Sabon-Gari',
      'Sanga',
      'Soba',
      'Zangon-Kataf',
      'Zaria',
    ],
  },
  {
    code: 'KN',
    name: 'Kano',
    capital: 'Kano',
    lat: '11.894838899570903',
    long: '8.5364136',
    lgas: [
      'Ajingi',
      'Albasu',
      'Bagwai',
      'Bebeji',
      'Bichi',
      'Bunkure',
      'Dala',
      'Dambatta',
      'Dawakin-Kudu',
      'Dawakin-Tofa',
      'Doguwa',
      'Fagge',
      'Gabasawa',
      'Garko',
      'Garun-Mallam',
      'Gaya',
      'Gezawa',
      'Gwale',
      'Gwarzo',
      'Kabo',
      'Kano-Municipal',
      'Karaye',
      'Kibiya',
      'Kiru',
      'Kumbotso',
      'Kunchi',
      'Kura',
      'Madobi',
      'Makoda',
      'Minjibir',
      'Nasarawa',
      'Rano',
      'Rimin-Gado',
      'Rogo',
      'Shanono',
      'Sumaila',
      'Takai',
      'Tarauni',
      'Tofa',
      'Tsanyawa',
      'Tudun-Wada',
      'Ungogo',
      'Warawa',
      'Wudil',
    ],
  },
  {
    code: 'KT',
    name: 'Katsina',
    capital: 'Kastina',
    lat: '12.563082499634245',
    long: '7.6207063',
    lgas: [
      'Bakori',
      'Batagarawa',
      'Batsari',
      'Baure',
      'Bindawa',
      'Charanchi',
      'Dan-Musa',
      'Dandume',
      'Danja',
      'Daura',
      'Dutsi',
      'Dutsin-Ma',
      'Faskari',
      'Funtua',
      'Ingawa',
      'Jibia',
      'Kafur',
      'Kaita',
      'Kankara',
      'Kankia',
      'Katsina',
      'Kurfi',
      'Kusada',
      'Mai-Adua',
      'Malumfashi',
      'Mani',
      'Mashi',
      'Matazu',
      'Musawa',
      'Rimi',
      'Sabuwa',
      'Safana',
      'Sandamu',
      'Zango',
    ],
  },
  {
    code: 'KE',
    name: 'Kebbi',
    capital: 'Birnin-Kebbi',
    lat: '11.416757399530335',
    long: '4.107454499999999',
    lgas: [
      'Aleiro',
      'Arewa-Dandi',
      'Argungu',
      'Augie',
      'Bagudo',
      'Birnin-Kebbi',
      'Bunza',
      'Dandi',
      'Fakai',
      'Gwandu',
      'Jega',
      'Kalgo',
      'Koko-Besse',
      'Maiyama',
      'Ngaski',
      'Sakaba',
      'Shanga',
      'Suru',
      'Wasagu/Danko',
      'Yauri',
      'Zuru',
    ],
  },
  {
    code: 'KO',
    name: 'Kogi',
    capital: 'Lokoja',
    lat: '7.79496019939138',
    long: '6.686866899999999',
    lgas: [
      'Adavi',
      'Ajaokuta',
      'Ankpa',
      'Dekina',
      'Ibaji',
      'Idah',
      'Igalamela-Odolu',
      'Ijumu',
      'Kabba Bunu',
      'Kogi',
      'Lokoja',
      'Mopa-Muro',
      'Ofu',
      'Ogori Magongo',
      'Okehi',
      'Okene',
      'Olamaboro',
      'Omala',
      'Oyi',
      'Yagba-East',
      'Yagba-West',
    ],
  },
  {
    code: 'KW',
    name: 'Kwara',
    capital: 'Ilorin',
    lat: '8.836789099397848',
    long: '4.668848699999999',
    lgas: [
      'Asa',
      'Baruten',
      'Edu',
      'Ekiti (Araromi/Opin)',
      'Ilorin-East',
      'Ilorin-South',
      'Ilorin-West',
      'Isin',
      'Kaiama',
      'Moro',
      'Offa',
      'Oke-Ero',
      'Oyun',
      'Pategi',
    ],
  },
  {
    code: 'LA',
    name: 'Lagos',
    capital: 'Ikeja',
    lat: '6.526903299421034',
    long: '3.5774005',
    lgas: [
      'Agege',
      'Ajeromi-Ifelodun',
      'Alimosho',
      'Amuwo-Odofin',
      'Apapa',
      'Badagry',
      'Epe',
      'Eti-Osa',
      'Ibeju-Lekki',
      'Ifako-Ijaiye',
      'Ikeja',
      'Ikorodu',
      'Kosofe',
      'Lagos-Island',
      'Lagos-Mainland',
      'Mushin',
      'Ojo',
      'Oshodi-Isolo',
      'Shomolu',
      'Surulere',
      'Yewa-South',
    ],
  },
  {
    code: 'NA',
    name: 'Nassarawa',
    capital: 'Lafia',
    lat: '8.438786799392046',
    long: '8.238284899999998',
    lgas: [
      'Akwanga',
      'Awe',
      'Doma',
      'Karu',
      'Keana',
      'Keffi',
      'Kokona',
      'Lafia',
      'Nasarawa',
      'Nasarawa-Eggon',
      'Obi',
      'Wamba',
      'Toto',
    ],
  },
  {
    code: 'NI',
    name: 'Niger',
    capital: 'Minna',
    lat: '9.932608299434758',
    long: '5.651108799999999',
    lgas: [
      'Agaie',
      'Agwara',
      'Bida',
      'Borgu',
      'Bosso',
      'Chanchaga',
      'Edati',
      'Gbako',
      'Gurara',
      'Katcha',
      'Kontagora',
      'Lapai',
      'Lavun',
      'Magama',
      'Mariga',
      'Mashegu',
      'Mokwa',
      'Moya',
      'Paikoro',
      'Rafi',
      'Rijau',
      'Shiroro',
      'Suleja',
      'Tafa',
      'Wushishi',
    ],
  },
  {
    code: 'OG',
    name: 'Ogun',
    capital: 'Abeokuta',
    lat: '6.978858199405861',
    long: '3.4389293',
    lgas: [
      'Abeokuta-North',
      'Abeokuta-South',
      'Ado-Odo Ota',
      'Ewekoro',
      'Ifo',
      'Ijebu-East',
      'Ijebu-North',
      'Ijebu-North-East',
      'Ijebu-Ode',
      'Ikenne',
      'Imeko-Afon',
      'Ipokia',
      'Obafemi-Owode',
      'Odeda',
      'Odogbolu',
      'Ogun-Waterside',
      'Remo-North',
      'Shagamu',
      'Yewa North',
    ],
  },
  {
    code: 'ON',
    name: 'Ondo',
    capital: 'Akure',
    lat: '7.0209685994047035',
    long: '5.0567477',
    lgas: [
      'Akoko North-East',
      'Akoko North-West',
      'Akoko South-West',
      'Akoko South-East',
      'Akure-North',
      'Akure-South',
      'Ese-Odo',
      'Idanre',
      'Ifedore',
      'Ilaje',
      'Ile-Oluji-Okeigbo',
      'Irele',
      'Odigbo',
      'Okitipupa',
      'Ondo West',
      'Ondo-East',
      'Ose',
      'Owo',
    ],
  },
  {
    code: 'OS',
    name: 'Osun',
    capital: 'Osogbo',
    lat: '7.548404699393967',
    long: '4.497830700000001',
    lgas: [
      'Atakumosa West',
      'Atakumosa East',
      'Ayedaade',
      'Ayedire',
      'Boluwaduro',
      'Boripe',
      'Ede South',
      'Ede North',
      'Egbedore',
      'Ejigbo',
      'Ife North',
      'Ife South',
      'Ife-Central',
      'Ife-East',
      'Ifelodun',
      'Ila',
      'Ilesa-East',
      'Ilesa-West',
      'Irepodun',
      'Irewole',
      'Isokan',
      'Iwo',
      'Obokun',
      'Odo-Otin',
      'Ola Oluwa',
      'Olorunda',
      'Oriade',
      'Orolu',
      'Osogbo',
    ],
  },
  {
    code: 'OY',
    name: 'Oyo',
    capital: 'Ibadan',
    lat: '8.215124899390593',
    long: '3.5642896999999993',
    lgas: [
      'Afijio',
      'Akinyele',
      'Atiba',
      'Atisbo',
      'Egbeda',
      'Ibadan North',
      'Ibadan North-East',
      'Ibadan North-West',
      'Ibadan South-East',
      'Ibadan South-West',
      'Ibarapa-Central',
      'Ibarapa-East',
      'Ibarapa-North',
      'Ido',
      'Ifedayo',
      'Irepo',
      'Iseyin',
      'Itesiwaju',
      'Iwajowa',
      'Kajola',
      'Lagelu',
      'Ogo-Oluwa',
      'Ogbomosho-North',
      'Ogbomosho-South',
      'Olorunsogo',
      'Oluyole',
      'Ona-Ara',
      'Orelope',
      'Ori-Ire',
      'Oyo-West',
      'Oyo-East',
      'Saki-East',
      'Saki-West',
      'Surulere',
    ],
  },
  {
    code: 'PL',
    name: 'Plateau',
    capital: 'Jos',
    lat: '9.058344599402849',
    long: '9.6826289',
    lgas: [
      'Barkin-Ladi',
      'Bassa',
      'Bokkos',
      'Jos-East',
      'Jos-North',
      'Jos-South',
      'Kanam',
      'Kanke',
      'Langtang-North',
      'Langtang-South',
      'Mangu',
      'Mikang',
      'Pankshin',
      "Qua'an Pan",
      'Riyom',
      'Shendam',
      'Wase',
    ],
  },
  {
    code: 'RI',
    name: 'Rivers',
    capital: 'Port-Harcourt',
    lat: '4.841602799518385',
    long: '6.8604088',
    lgas: [
      'Abua Odual',
      'Ahoada-East',
      'Ahoada-West',
      'Akuku Toru',
      'Andoni',
      'Asari-Toru',
      'Bonny',
      'Degema',
      'Eleme',
      'Emuoha',
      'Etche',
      'Gokana',
      'Ikwerre',
      'Khana',
      'Obio Akpor',
      'Ogba-Egbema-Ndoni',
      'Ogba Egbema Ndoni',
      'Ogu Bolo',
      'Okrika',
      'Omuma',
      'Opobo Nkoro',
      'Oyigbo',
      'Port-Harcourt',
      'Tai',
    ],
  },
  {
    code: 'SO',
    name: 'Sokoto',
    capital: 'Sokoto',
    lat: '13.061119499685718',
    long: '5.3152203',
    lgas: [
      'Binji',
      'Bodinga',
      'Dange-Shuni',
      'Gada',
      'Goronyo',
      'Gudu',
      'Gwadabawa',
      'Illela',
      'Kebbe',
      'Kware',
      'Rabah',
      'Sabon Birni',
      'Shagari',
      'Silame',
      'Sokoto-North',
      'Sokoto-South',
      'Tambuwal',
      'Tangaza',
      'Tureta',
      'Wamako',
      'Wurno',
      'Yabo',
    ],
  },
  {
    code: 'TA',
    name: 'Taraba',
    capital: 'Jalingo',
    lat: '8.0141333993904',
    long: '10.737633599999999',
    lgas: [
      'Ardo-Kola',
      'Bali',
      'Donga',
      'Gashaka',
      'Gassol',
      'Ibi',
      'Jalingo',
      'Karim-Lamido',
      'Kurmi',
      'Lau',
      'Sardauna',
      'Takum',
      'Ussa',
      'Wukari',
      'Yorro',
      'Zing',
    ],
  },
  {
    code: 'YO',
    name: 'Yobe',
    capital: 'Damaturu',
    lat: '12.123324199591742',
    long: '11.506593699999998',
    lgas: [
      'Bade',
      'Bursari',
      'Damaturu',
      'Fika',
      'Fune',
      'Geidam',
      'Gujba',
      'Gulani',
      'Jakusko',
      'Karasuwa',
      'Machina',
      'Nangere',
      'Nguru',
      'Potiskum',
      'Tarmuwa',
      'Yunusari',
      'Yusufari',
    ],
  },
  {
    code: 'ZA',
    name: 'Zamfara',
    capital: 'Gusau',
    lat: '12.007899799581104',
    long: '6.4191432',
    lgas: [
      'Anka',
      'Bakura',
      'Birnin Magaji/Kiyaw',
      'Bukkuyum',
      'Bungudu',
      'Gummi',
      'Gusau',
      'Isa',
      'Kaura-Namoda',
      'Kiyawa',
      'Maradun',
      'Maru',
      'Shinkafi',
      'Talata-Mafara',
      'Tsafe',
      'Zurmi',
    ],
  },
];
const cities = ref(states[0].lgas);

const address = reactive({
  state: states[0].name,
  city: cities.value[0],
  phone1: null,
  phone2: null,
  address1: null,
  address2: null,
});

const paymentOption = ref('card');

watch(
  () => address.state,
  (state) => {
    states.forEach((st) => {
      if (st.name == state) {
        cities.value = st.lgas;
        address.city = '------select------';
      }
    });
  }
);

onMounted(() => {
  const { isLoggedIn } = storeToRefs(useAuthStore());
  if (!isLoggedIn.value) {
    $q.dialog({
      title: 'Authentication Failed',
      message:
        'This account cannot be authenticated, please sign in or create a new account to proceed with this request.',
      ok: 'signin',
      persistent: true,
      cancel: false,
    }).onOk(() => {
      return router.push({ path: '/auth/login', query: { r: 'checkout' } });
    });
  }
});

function checkout() {
  const CartProducts = Cart.value.map((ct) => {
    return {
      productId: ct.product.id,
      quantity: ct.quantity,
      amount: ct.product.market_price * ct.quantity,
    };
  });
  const requestBody = JSON.stringify({
    products: CartProducts,
    address: address,
    payOption: paymentOption.value,
    totalAmount: sumAmount.value
  });

  isLoading.value = true
  fetch(`${api}/store/sale/createOrder`, {
    method: 'put',
    body: requestBody,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${$q.cookies.get('authKey') as string}`
    },
  })
  .then(res => res.json())
  .then(data => {
    isLoading.value = false

    if (data.success) {
      location.href = data.payLink
      return
    }

    $q.notify({
      color: 'red-5',
      textColor: 'red-14',
      iconColor: 'red-14',
      icon: 'error',
      position: 'top-right',
      message: data.msg
    })
  })
  .catch(error => {
    isLoading.value = false
    $q.notify({
      color: 'red-5',
      textColor: 'red-14',
      iconColor: 'red-14',
      icon: 'error',
      position: 'top-right',
      message: error.message
    })
  })
}
</script>
<template>
  <q-page>
    <BreadCrumbs title="Checkout" :navs="['Cart', 'Checkout']" />

    <div>
      <section class="tw-bg-white tw-py-8 tw-antialiased md:tw-py-16">
        <form
          action="#"
          class="tw-mx-auto tw-max-w-screen-xl tw-px-4 2xl:tw-px-0"
        >
          <div
            class="tw-mt-6 sm:tw-mt-8 lg:tw-flex lg:tw-items-start lg:tw-gap-12 xl:tw-gap-16"
          >
            <div class="tw-min-w-0 tw-flex-1 tw-space-y-8">
              <div class="tw-space-y-4">
                <h2 class="tw-text-xl tw-font-semibold tw-text-gray-900">
                  Delivery Details
                </h2>

                <div class="tw-grid tw-grid-cols-1 tw-gap-4 sm:tw-grid-cols-2">
                  <div>
                    <div class="tw-mb-2 tw-flex tw-items-center tw-gap-2">
                      <label
                        for="select-country-input-3"
                        class="tw-block tw-text-sm tw-font-medium tw-text-gray-900"
                      >
                        State*
                      </label>
                    </div>
                    <q-select
                      id="select-country-input-3"
                      dense
                      borderless
                      :options="states"
                      option-value="name"
                      option-label="name"
                      emit-value
                      map-options
                      class="tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-px-2.5 tw-text-sm tw-text-gray-900 focus:tw-border-primary-500 focus:tw-ring-primary-500"
                      v-model="address.state"
                    />
                  </div>

                  <div>
                    <div class="tw-mb-2 tw-flex tw-items-center tw-gap-2">
                      <label
                        for="select-city-input-3"
                        class="tw-block tw-text-sm tw-font-medium tw-text-gray-900"
                      >
                        City*
                      </label>
                    </div>
                    <q-select
                      id="select-city-input-3"
                      v-model="address.city"
                      borderless
                      dense
                      :options="cities"
                      class="tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-px-2.5 tw-text-sm tw-text-gray-900 focus:tw-border-primary-500 focus:tw-ring-primary-500"
                    />
                  </div>

                  <div>
                    <label
                      for="phone"
                      class="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                    >
                      Phone Number 1*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      class="tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-sm tw-text-gray-900 focus:tw-border-primary-500 focus:tw-ring-primary-500"
                      placeholder="8061982520"
                      required
                      v-model="address.phone1"
                    />
                  </div>

                  <div>
                    <label
                      for="phone2"
                      class="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                    >
                      Phone Number 2
                    </label>
                    <input
                      type="tel"
                      id="phone2"
                      class="tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-sm tw-text-gray-900 focus:tw-border-primary-500 focus:tw-ring-primary-500"
                      placeholder="08061982520"
                      required
                      v-model="address.phone2"
                    />
                  </div>

                  <div>
                    <label
                      for="address1"
                      class="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900"
                    >
                      Home Address 1
                    </label>
                    <input
                      type="text"
                      id="address1"
                      class="tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-sm tw-text-gray-900 focus:tw-border-primary-500 focus:tw-ring-primary-500 "
                      placeholder="Home Adress"
                      required
                      v-model="address.address1"
                    />
                  </div>

                  <div>
                    <label
                      for="address2"
                      class="tw-mb-2 tw-block tw-text-sm tw-font-medium tw-text-gray-900"
                    >
                      Home Address 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      class="tw-block tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-2.5 tw-text-sm tw-text-gray-900 focus:tw-border-primary-500 focus:tw-ring-primary-500"
                      placeholder="address"
                      v-model="address.address2"
                    />
                  </div>
                </div>
              </div>

              <div class="tw-space-y-4">
                <h3
                  class="tw-text-xl tw-font-semibold tw-text-gray-900"
                >
                  Payment
                </h3>

                <div class="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-3">
                  <div
                    class="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-50 tw-p-4 tw-ps-4"
                  >
                    <div class="tw-flex tw-items-start">
                      <div class="tw-flex tw-h-5 tw-items-center">
                        <input
                          id="credit-card"
                          aria-describedby="credit-card-text"
                          type="radio"
                          name="payment-method"
                          value=""
                          class="tw-h-4 tw-w-4 tw-border-gray-300 tw-bg-white tw-text-primary-600 focus:tw-ring-2 focus:tw-ring-primary-600"
                          checked
                        />
                      </div>

                      <div class="tw-ms-4 tw-text-sm">
                        <label
                          for="credit-card"
                          class="tw-font-medium tw-leading-none tw-text-gray-900"
                        >
                          Credit Card
                        </label>
                        <p
                          id="credit-card-text"
                          class="tw-mt-1 tw-text-xs tw-font-normal tw-text-gray-500"
                        >
                          Pay with your credit card
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-gray-50 tw-p-4 tw-ps-4"
                  >
                    <div class="tw-flex tw-items-start">
                      <div class="tw-flex tw-h-5 tw-items-center">
                        <input
                          id="pay-on-delivery"
                          aria-describedby="pay-on-delivery-text"
                          type="radio"
                          name="payment-method"
                          value=""
                          class="tw-h-4 tw-w-4 tw-border-gray-300 tw-bg-white tw-text-primary-600 focus:tw-ring-2 focus:tw-ring-primary-600"
                        />
                      </div>

                      <div class="tw-ms-4 tw-text-sm">
                        <label
                          for="pay-on-delivery"
                          class="tw-font-medium tw-leading-none tw-text-gray-900"
                        >
                          Payment on delivery
                        </label>
                        <p
                          id="pay-on-delivery-text"
                          class="tw-mt-1 tw-text-xs tw-font-normal tw-text-gray-500"
                        >
                          +<span v-naira="1000"></span> payment processing fee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="tw-mt-6 tw-w-full tw-space-y-6 sm:tw-mt-8 lg:tw-mt-0 lg:tw-max-w-xs xl:tw-max-w-md"
            >
              <div class="tw-flow-root">
                <div class="-tw-my-3">
                  <dl
                    class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-py-3"
                  >
                    <dt
                      class="tw-text-base tw-font-normal tw-text-gray-500"
                    >
                      Subtotal
                    </dt>
                    <dd
                      class="tw-text-base tw-font-medium tw-text-gray-900"
                      v-naira="total_price"
                      >
                     
                    </dd>
                  </dl>

                  <dl
                    class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-py-3"
                  >
                    <dt
                      class="tw-text-base tw-font-normal tw-text-gray-500"
                    >
                      Delivery
                    </dt>
                    <dd
                      class="tw-text-base tw-font-medium tw-text-gray-900"
                      v-naira="delivery_price"
                    ></dd>
                  </dl>

                  <dl
                    class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-py-3"
                  >
                    <dt
                      class="tw-text-base tw-font-normal tw-text-gray-500"
                    >
                      Tax
                    </dt>
                    <dd
                      class="tw-text-base tw-font-medium tw-text-gray-900"
                      v-naira="tax"
                    ></dd>
                  </dl>

                  <dl
                    class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-py-3"
                  >
                    <dt
                      class="tw-text-base tw-font-bold tw-text-gray-900"
                    >
                      Total
                    </dt>
                    <dd
                      class="tw-text-base tw-font-bold tw-text-gray-900"
                      v-naira="sumAmount"
                      >
                     
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="tw-space-y-3">
                <q-btn
                  type="button"
                  class="tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-lg bg-accent text-white tw-px-5 tw-py-2.5 tw-text-sm tw-font-medium"
                  @click="checkout"
                  :loading="isLoading"
                  flat
                  no-caps
                >
                  Proceed to Payment
                </q-btn>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  </q-page>
</template>

<style scoped></style>
