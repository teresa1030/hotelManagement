import axios from 'axios'
// import worldMap from '../assets/js/map'

var loginData = JSON.parse(localStorage.getItem('token'))
var arr =[]
var arr1 = []
var moment = require('moment')
var today = moment().subtract(1, 'days')
var todayEnd = moment()

axios.get('/api/statistic').then(response => {
  var data = response.data
  data.filter((item) => {
    item.data.filter((child) => {
      if(child.hotelName === loginData.companyName){
        arr.push({time: item.time, data: child})
      }
    })
  })
  arr.filter((item) => {
    if((Date.parse(item.time) >= Date.parse(today._d)) && (Date.parse(item.time) <= Date.parse(todayEnd._d))){
      console.log(item.data.countries_count)
      arr1.push(item.data.countries_count)
    }
  })
  // console.log(arr1[0][2].number)
  var WebsiteData = {
    data: {
      websiteNum: {
        name: 'Number per day',
        format: '{0} USD',
        thousandSeparator: ',',
        thresholdMax: 50000,
        thresholdMin: 1000
      }
    //   ,
    //   change: {
    //     name: 'Change to year before',
    //     format: '{0} %'
    //   },
    //   websiteNumAdjusted: {
    //     name: 'Purchasing Power Parity',
    //     format: '{0} USD',
    //     thousandSeparator: ',',
    //     thresholdMax: 50000,
    //     thresholdMin: 1000
    //   },
    //   changeAdjusted: {
    //     name: 'Change to year before',
    //     format: '{0} %'
    //   }
    // 11阿拉伯聯合大公國
    // SY 42 敘利亞
    // 冰島45
    },
    applyData: 'websiteNumAdjusted',
    values: {
      AF: {websiteNum: 587},
      AL: {websiteNum: 4583},
      DZ: {websiteNum: 4293},
      AO: {websiteNum: 4408},
      AG: {websiteNum: 16702},
      AR: {websiteNum: 14467},
      AM: {websiteNum: 3861},
      AU: {websiteNum: arr1[0][2].number},
      AT: {websiteNum: arr1[0][32].number},
      AZ: {websiteNum: 4141},
      BS: {websiteNum: 31255},
      BH: {websiteNum: 24029},
      BD: {websiteNum: 1602},
      BB: {websiteNum: 17859},
      BY: {websiteNum: 5760},
      BE: {websiteNum:  arr1[0][21].number},
      BZ: {websiteNum: 4806},
      BJ: {websiteNum: 830},
      BT: {websiteNum: 2903},
      BO: {websiteNum:  arr1[0][24].number},
      BA: {websiteNum: 5149},
      BW: {websiteNum: 7877},
      BR: {websiteNum:  arr1[0][61].number},
      BN: {websiteNum: 29712},
      BG: {websiteNum:  arr1[0][50].number},
      BF: {websiteNum: 664},
      BI: {websiteNum: 312},
      KH: {websiteNum:  arr1[0][29].number},
      CM: {websiteNum: 1401},
      CA: {websiteNum:  arr1[0][9].number},
      XK: {websiteNum: 3880},
      CV: {websiteNum: 3237},
      CF: {websiteNum: 387},
      TD: {websiteNum: 810},
      CL: {websiteNum: 15070},
      CN: {websiteNum: 8643},
      CO: {websiteNum:  arr1[0][28].number},
      KM: {websiteNum: 788},
      CG: {websiteNum: 1958},
      CR: {websiteNum: 11685},
      HR: {websiteNum: 13138},
      CY: {websiteNum: 24976},
      CZ: {websiteNum:  arr1[0][53].number},
      CD: {websiteNum: 478},
      DK: {websiteNum:  arr1[0][60].number},
      DJ: {websiteNum: 1989},
      DM: {websiteNum: 79219},
      DO: {websiteNum: 73750},
      EC: {websiteNum: 6099},
      EG: {websiteNum:  arr1[0][43].number},
      SV: {websiteNum: 448},
      GQ: {websiteNum:  arr1[0][47].number},
      ER: {websiteNum: 973},
      EE: {websiteNum:  arr1[0][49].number},
      ET: {websiteNum: 8743},
      FM: {websiteNum: 3207},
      FJ: {websiteNum: 57408},
      FI: {websiteNum:  arr1[0][20].number},
      FR: {websiteNum:  arr1[0][22].number},
      GA: {websiteNum: 79733},
      GM: {websiteNum:  arr1[0][14].number},
      GE: {websiteNum: 40907},
      DE: {websiteNum: 44507},
      GH: {websiteNum: 168},
      GR: {websiteNum:  arr1[0][52].number},
      GD: {websiteNum: 10304},
      GT: {websiteNum: 441},
      GN: {websiteNum: 709},
      GW: {websiteNum: 79457},
      GY: {websiteNum: 47105},
      HT: {websiteNum: 703},
      HN: {websiteNum: 2717},
      HK: {websiteNum: arr1[0][0].number},
      HU: {websiteNum: arr1[0][33].number},
      IS: {websiteNum: arr1[0][16].number},
      IN: {websiteNum: arr1[0][17].number},
      ID: {websiteNum: arr1[0][30].number},
      IR: {websiteNum: arr1[0][55].number},
      IQ: {websiteNum: 508879},
      IE: {websiteNum: arr1[0][15].number},
      IL: {websiteNum: 402587},
      IT: {websiteNum: arr1[0][57].number},
      CI: {websiteNum: arr1[0][34].number},
      JM: {websiteNum: arr1[0][31].number},
      JP: {websiteNum: arr1[0][5].number},
      JO: {websiteNum: 567813},
      KZ: {websiteNum: 8847},
      KE: {websiteNum: 17029},
      KI: {websiteNum: 1723},
      KW: {websiteNum: 26031},
      KG: {websiteNum: 115},
      LA: {websiteNum: arr1[0][54].number},
      LV: {websiteNum: 1558},
      LB: {websiteNum: arr1[0][37].number},
      LS: {websiteNum: 1428},
      LR: {websiteNum: 725},
      LY: {websiteNum: 488},
      LT: {websiteNum: 1678},
      LU: {websiteNum: arr1[0][36].number},
      MO: {websiteNum: 77452},
      MK: {websiteNum: 547},
      MG: {websiteNum: 447},
      MW: {websiteNum: 324},
      MY: {websiteNum: arr1[0][62].number},
      MV: {websiteNum: arr1[0][58].number},
      ML: {websiteNum: 8111},
      MT: {websiteNum: 2726},
      MH: {websiteNum: 3623},
      MR: {websiteNum: 1312},
      MU: {websiteNum: 97967},
      MX: {websiteNum: arr1[0][38].number},
      MD: {websiteNum: 2284},
      MN: {websiteNum: 3645},
      ME: {websiteNum: 7646},
      MA: {websiteNum: 31596},
      MZ: {websiteNum: 4299},
      MM: {websiteNum: arr1[0][35].number},
      NA: {websiteNum: 5412},
      NR: {websiteNum: 8522},
      NP: {websiteNum: 8341},
      NL: {websiteNum: arr1[0][51].number},
      NZ: {websiteNum: arr1[0][25].number},
      NI: {websiteNum: 222},
      NE: {websiteNum: 447},
      NG: {websiteNum: 19976},
      NO: {websiteNum: arr1[0][23].number},
      OM: {websiteNum: 17923},
      PK: {websiteNum: arr1[0][7].number},
      PW: {websiteNum: 17006},
      PA: {websiteNum: 150882},
      PG: {websiteNum: 2861},
      PY: {websiteNum: 42606},
      PE: {websiteNum: arr1[0][40].number},
      PH: {websiteNum: arr1[0][19].number},
      PL: {websiteNum: arr1[0][44].number},
      PT: {websiteNum: arr1[0][27].number},
      PR: {websiteNum: 304835},
      QA: {websiteNum: arr1[0][59].number},
      RO: {websiteNum: arr1[0][48]},
      RU: {websiteNum: 1060850},
      RW: {websiteNum: 7720},
      KN: {websiteNum: 1621},
      LC: {websiteNum: 961},
      VC: {websiteNum: 7270},
      WS: {websiteNum: 42580},
      SM: {websiteNum: 47465},
      ST: {websiteNum: 178},
      SA: {websiteNum: arr1[0][12].number},
      SN: {websiteNum: arr1[0][10].number},
      RS: {websiteNum: 58983},
      SC: {websiteNum: 1565},
      SL: {websiteNum: 495},
      SG: {websiteNum: 57722},
      SK: {websiteNum: 17661},
      SI: {websiteNum: 23693},
      SB: {websiteNum: 2089},
      SO: {websiteNum: 482},
      ZA: {websiteNum: arr1[0][3].number},
      KR: {websiteNum: arr1[0][18].number},
      SS: {websiteNum: 2282},
      ES: {websiteNum: arr1[0][26].number},
      LK: {websiteNum: arr1[0][4].number},
      SD: {websiteNum: 142},
      SR: {websiteNum: 577},
      SZ: {websiteNum: arr1[0][13].number},
      SE: {websiteNum: arr1[0][41].number},
      CH: {websiteNum: arr1[0][1].number},
      TW: {websiteNum: arr1[0][6].number},
      TJ: {websiteNum: 8246},
      TZ: {websiteNum: 106},
      TH: {websiteNum: arr1[0][56].number},
      TL: {websiteNum: 2107},
      TG: {websiteNum: 6115},
      TO: {websiteNum: 41726},
      TT: {websiteNum: 157658},
      TN: {websiteNum: 345},
      TR: {websiteNum: arr1[0][39].number},
      TM: {websiteNum: 66436},
      TV: {websiteNum: 3638},
      UG: {websiteNum: 69},
      UA: {websiteNum: 25802},
      AE: {websiteNum: 372266},
      GB: {websiteNum: arr1[0][8].number},
      US: {websiteNum: arr1[0][63].number},
      UY: {websiteNum: 16724},
      UZ: {websiteNum: 14},
      VU: {websiteNum: 303},
      VE: {websiteNum: 660},
      VN: {websiteNum: arr1[0][46].number},
      YE: {websiteNum: 5517},
      ZM: {websiteNum: 1485},
      ZW: {websiteNum: 117}
    }
  }

})

