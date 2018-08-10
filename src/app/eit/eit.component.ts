import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl,Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-eit',
  templateUrl: './eit.component.html',
  styleUrls: ['./eit.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class EitComponent implements OnInit {

  lang: any;
  category: any;
  subCategory: any;
  csaRating: any;
  customCsaRating: any;
  countries: any;
  tags: any;
  blockToShow = 1;
  enabledPrettyJson = false;

  eit = new FormGroup({
    eitPresentSection: new FormGroup({
      eitEvents: new FormGroup({
        SHORT_EVENT_DESCRIPTOR: new FormGroup({
          event_name: new FormControl(''),
          event_text: new FormControl(''),
          event_lang: new FormControl('')
        }),
        EXTENDED_EVENT_DESCRIPTOR: new FormGroup({
          text: new FormControl(''),
          lang: new FormControl('')
        }),
        CONTENT_DESCRIPTOR: new FormGroup({
          content_nibble_level_1: new FormControl(''),
          content_nibble_level_2: new FormControl('')
        }),
        PARENTAL_RATING_DESCRIPTOR: new FormGroup({
          country_code: new FormControl(''),
          age: new FormControl('')
        }),

        COMPONENT_DESCRIPTOR: new FormGroup({
          stream_content: new FormControl(''),
          text: new FormControl(''),
          lang: new FormControl('')
        })
      })
    }),
    eitFollowingSection: new FormGroup({
      eitEvents: new FormGroup({
        SHORT_EVENT_DESCRIPTOR: new FormGroup({
          event_name: new FormControl(''),
          event_text: new FormControl(''),
          event_lang: new FormControl('')
        }),
        EXTENDED_EVENT_DESCRIPTOR: new FormGroup({
          text: new FormControl(''),
          lang: new FormControl('')
        }),
        CONTENT_DESCRIPTOR: new FormGroup({
          content_nibble_level_1: new FormControl(''),
          content_nibble_level_2: new FormControl('')
        }),
        PARENTAL_RATING_DESCRIPTOR: new FormGroup({
          country_code: new FormControl(''),
          age: new FormControl('')
        }),

        COMPONENT_DESCRIPTOR: new FormGroup({
          stream_content: new FormControl(''),
          text: new FormControl(''),
          lang: new FormControl('')
        })
      })
    })
  }); 
  
  jsonRegex ='{"eitGeneral":{"version":"1.10","target":"-1"},"eitPresentSection":{"eitEvents":[{"SHORT_EVENT_DESCRIPTOR":{"event_name":"[a-zA-Z0-9_ ]*","event_text":"[a-zA-Z0-9_ ]*","event_lang":"[a-zA-Z0-9_ ]*"},"EXTENDED_EVENT_DESCRIPTOR":{"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*","items":\\[\\]},"CONTENT_DESCRIPTOR":\\[({"content_nibble_level_1":"[a-zA-Z0-9_ ]*","content_nibble_level_2":"[a-zA-Z0-9_ ]*"})?\\],"PARENTAL_RATING_DESCRIPTOR":{"country_code":"[a-zA-Z0-9_ ]*","age":[0-9]*},"PRIVATE_DESCRIPTOR":\\[({"tag":"[a-zA-Z0-9_ ]*","token":"[a-zA-Z0-9_ ]*"})?\\],"COMPONENT_DESCRIPTOR":[{"stream_content":"[a-zA-Z0-9_ ]*","component_type":"[a-zA-Z0-9_ ]*","set_component_tag":[0-9]*,"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*"},{"stream_content":"[a-zA-Z0-9_ ]*","component_type":"[a-zA-Z0-9_ ]*","set_component_tag":[0-9]*,"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*"},{"stream_content":"[a-zA-Z0-9_ ]*","component_type":"[a-zA-Z0-9_ ]*","set_component_tag":[0-9]*,"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*"}]}]},"eitFollowingSection":{"eitEvents":[{"SHORT_EVENT_DESCRIPTOR":{"event_name":"[a-zA-Z0-9_ ]*","event_text":"[a-zA-Z0-9_ ]*","event_lang":"[a-zA-Z0-9_ ]*"},"EXTENDED_EVENT_DESCRIPTOR":{"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*","items":\\[\\]},"CONTENT_DESCRIPTOR":\\[({"content_nibble_level_1":"[a-zA-Z0-9_ ]*","content_nibble_level_2":"[a-zA-Z0-9_ ]*"})?\\],"PARENTAL_RATING_DESCRIPTOR":{"country_code":"[a-zA-Z0-9_ ]*","age":[0-9]*},"PRIVATE_DESCRIPTOR":\\[({"tag":"[a-zA-Z0-9_ ]*","token":"[a-zA-Z0-9_ ]*"})?\\],"COMPONENT_DESCRIPTOR":[{"stream_content":"[a-zA-Z0-9_ ]*","component_type":"[a-zA-Z0-9_ ]*","set_component_tag":[0-9]*,"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*"},{"stream_content":"[a-zA-Z0-9_ ]*","component_type":"[a-zA-Z0-9_ ]*","set_component_tag":[0-9]*,"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*"},{"stream_content":"[a-zA-Z0-9_ ]*","component_type":"[a-zA-Z0-9_ ]*","set_component_tag":[0-9]*,"text":"[a-zA-Z0-9_ ]*","lang":"[a-zA-Z0-9_ ]*"}]}]}}';
 
  jsonForm = new FormGroup({
    jsonTextArea: new FormControl('',Validators.pattern(this.jsonRegex))
  });
  get jsonTextArea() {
    return this.jsonForm.get('jsonTextArea');
  }
  
  jsonText = {
    "eitGeneral":
      {
        "version":"1.10",
        "target":"-1"
      },
    "eitPresentSection":
      {
        "eitEvents":[
          {
            "SHORT_EVENT_DESCRIPTOR":{
              "event_name":"",
              "event_text":"",
              "event_lang":""
            },
            "EXTENDED_EVENT_DESCRIPTOR":{
              "text":"",
              "lang":"",
              "items":[]
            },
            "CONTENT_DESCRIPTOR":[{
              "content_nibble_level_1":"",
              "content_nibble_level_2":""
            }],
            "PARENTAL_RATING_DESCRIPTOR":{
              "country_code":"",
              "age":9,
            },
            "PRIVATE_DESCRIPTOR":[
              {
                "tag":"0xAA",
                "token":""
              }
            ],
            "COMPONENT_DESCRIPTOR":[
              {
                "stream_content":"0x05",
                "component_type":"0x01",
                "set_component_tag":46,
                "text":"aspect ratio",
                "lang":"fre"
              },
              {
                "stream_content":"0x06",
                "component_type":"0x03",
                "set_component_tag":46,
                "text":"cx",
                "lang":"fre"
              },
              {
                "stream_content":"0x03",
                "component_type":"0x10",
                "set_component_tag":46,
                "text":"subtitle",
                "lang":"fre"
              }
            ]
          }
        ]
      },
    "eitFollowingSection":
    {
      "eitEvents":[
        {
          "SHORT_EVENT_DESCRIPTOR":{
            "event_name":"",
            "event_text":"",
            "event_lang":""
          },
          "EXTENDED_EVENT_DESCRIPTOR":{
            "text":"",
            "lang":"",
            "items":[]
          },
          "CONTENT_DESCRIPTOR":[{
            "content_nibble_level_1":"",
            "content_nibble_level_2":""
          }],
          "PARENTAL_RATING_DESCRIPTOR":{
            "country_code":"",
            "age":9,
          },
          "PRIVATE_DESCRIPTOR":[
            {
              "tag":"0xAA",
              "token":""
            }
          ],
          "COMPONENT_DESCRIPTOR":[
            {
              "stream_content":"0x05",
              "component_type":"0x01",
              "set_component_tag":46,
              "text":"aspect ratio",
              "lang":"fre"
            },
            {
              "stream_content":"0x06",
              "component_type":"0x03",
              "set_component_tag":46,
              "text":"audio",
              "lang":"fre"
            },
            {
              "stream_content":"0x03",
              "component_type":"0x10",
              "set_component_tag":46,
              "text":"subtitle",
              "lang":"fre"
            }
          ]
        }
      ]
    }
  };

  constructor() {
    this.lang = [
      { label: 'allemand', value: 'ger' },
      { label: 'anglais', value: 'eng' },
      { label: 'breton', value: 'bre' },
      { label: 'chinois', value: 'chi' },
      { label: 'grec', value: 'gre' },
      { label: 'hindi', value: 'hin' },
      { label: 'italien', value: 'ita' },
      { label: 'japonais', value: 'jpn' },
      { label: 'néerlandais', value: 'dut' },
      { label: 'russe', value: 'rus' }
    ];

    this.category = [
      { label: 'Art Culture (sans musique)', value: '0x7' },
      { label: 'Education, Science, Santé', value: '0x9' },
      { label: 'Enfant, Junior', value: '0x5' },
      { label: 'Film, mélodrame', value: '0x1' },
      { label: 'Journal, Documentaire', value: '0x2' },
      { label: 'Loisirs', value: '0xA' },
      { label: 'Musique, Ballet, Danse', value: '0x6' },
      { label: 'Société, Politique, Economie', value: '0x8' },
      { label: 'Sport', value: '0x4' },
      { label: 'Variété, débat', value: '0x3' },
      { label: 'undefined content', value: '0x0' }
    ];

    this.subCategory = [
      { label: 'Beaux-Arts', value: '0x02' },
      { label: 'arts/culture (sans musique, général)', value: '0x00' },
      { label: 'film experimental', value: '0x07' },
      { label: 'lettres', value: '0x05' },
      { label: 'media', value: '0x08' },
      { label: 'nouvelles technologies', value: '0x09' },
      { label: 'religion', value: '0x03' },
      { label: 'théatre', value: '0x01' }
    ];

    this.csaRating = [
      { label: 'CSA1 (0)', value: '0' },
      { label: 'CSA2 (7)', value: '7' },
      { label: 'CSA3 (9)', value: '9' },
      { label: 'CSA4 (13)', value: '13' },
      { label: 'CSA5 (15)', value: '15' }
    ];

    this.countries = [
      { label: 'Algérie', value: 'DZA' },
      { label: 'Allemagne', value: 'DEU' },
      { label: 'Argentine', value: 'ARG' },
      { label: 'Belgique', value: 'BEL' },
      { label: 'Canada', value: 'CAN' },
      { label: 'Chine', value: 'CHN' },
      { label: 'Espagne', value: 'ESP' },
      { label: 'Etats-Unis', value: 'USA' },
      { label: 'Italie', value: 'ITA' },
      { label: 'Liban', value: 'LBN' },
      { label: 'Maroc', value: 'MAR' },
      { label: 'Pologne', value: 'POL' },
      { label: 'Royaume-Uni', value: 'GBR' },
      { label: 'Tunisie', value: 'TUN' },
      { label: 'France', value: 'FRA' }
    ];

    this.tags = [
      { label: '0xAA - Barker , Start Over , See also', value: '0xAA' },
      { label: '0xAB - Interactive service', value: '0xAB' }
    ];
  }

  ngOnInit() {
    this.jsonForm.patchValue({jsonTextArea : JSON.stringify(this.jsonText)});
  }


  onChange(event) {
    switch (event.value) {
      case '0x7': {
        this.subCategory = [
          {label: 'Beaux-Arts',  value: '0x02' },
          {label: 'arts/culture (sans musique, général)',  value: '0x00' },
          {label: 'film experimental',  value: '0x07' },
          {label: 'lettres',  value: '0x05' },
          {label: 'media',  value: '0x08' },
          {label: 'nouvelles technologies',  value: '0x09' },
          {label: 'religion',  value: '0x03' },
          {label: 'théatre',  value: '0x01' }
        ];
       break;
      }
      case '0x9': {
        this.subCategory = [
          { label: 'découverte', value: '0x04'},
          { label: 'education', value: '0x06'},
          { label: 'langues', value: '0x07'},
          { label: 'santé', value: '0x03'},
          { label: 'sciences sociales', value: '0x05'}
        ];
       break;
      }
      case '0x5': {
        this.subCategory = [
          {label: 'Ado', value: '0x03'},
          {label: 'Enfant', value: '0x01'},
          {label: 'Junior', value: '0x02'}
        ];
       break;
      }
      case '0x1': {
        this.subCategory = [
          {label: 'movie/mélodrame', value: '0x5'}
        ];
       break;
      }
      case '0x2': {
        this.subCategory = [
          {label: 'documentaire', value: '0x03'},
          {label: 'journal', value: '0x02'}
        ];
       break;
      }
      case '0xA': {
        this.subCategory = [
          {label: 'artisanat', value: '0x02'},
          {label: 'arts de la table', value: '0x05'},
          {label: 'bien être', value: '0x04'},
          {label: 'jardinage', value: '0x07'},
          {label: 'loisirs (general)', value: '0x00'},
          {label: 'sports mécaniques', value: '0x03'}
        ];
       break;
      }
      case '0x6': {
        this.subCategory = [
          {label: 'musique traditionnelle', value: '0x03'}
        ];
       break;
      }
      case '0x8': {
        this.subCategory = [
          {label: 'documentaire', value: '0x01'},
          {label: 'société (général)', value: '0x00'}
        ];
       break;
      }
      case '0x4': {
        this.subCategory = [
          {label: 'sports d\'hiver', value: '0x09'},
          {label: 'sports nautiques', value: '0x08'}
        ];
       break;
      }
      case '0x3': {
        this.subCategory = [
          {label: 'débat', value: '0x03'},
          {label: 'variétés', value: '0x02'}
        ];
       break;
      }
      case '0x0': {
        this.subCategory = [
          {label: 'undefined content', value: '0x0'}
        ];
       break;
      }
      default: {
        this.subCategory = [];
       break;
      }
    }
  }

  changeRating(checked) {
    if (checked) {
      this.csaRating = [
        {label: 'CSA1 (16)',  value: '16' },
        {label: 'CSA2 (17)',  value: '17' },
        {label: 'CSA3 (18)',  value: '18' },
        {label: 'CSA4 (19)',  value: '19' },
        {label: 'CSA5 (20)',  value: '20' },
      ];
    } else {
      this.csaRating = [
        {label: 'CSA1 (0)',  value: '0' },
        {label: 'CSA2 (7)',  value: '7' },
        {label: 'CSA3 (9)',  value: '9' },
        {label: 'CSA4 (13)',  value: '13' },
        {label: 'CSA5 (15)',  value: '15' },
      ];
    }
  }

  changeDiv(divToChange){
    this.blockToShow = divToChange;
  }

  showJson(){
    let jsonText = {
      "eitGeneral":
        {
          "version":"1.10",
          "target":"-1"
        },
      "eitPresentSection":
        {
          "eitEvents":[
            {
              "SHORT_EVENT_DESCRIPTOR":{
                "event_name":this.eit.value.eitPresentSection.eitEvents.SHORT_EVENT_DESCRIPTOR.event_name,
                "event_text":this.eit.value.eitPresentSection.eitEvents.SHORT_EVENT_DESCRIPTOR.event_text,
                "event_lang":this.eit.value.eitPresentSection.eitEvents.SHORT_EVENT_DESCRIPTOR.event_lang
              },
              "EXTENDED_EVENT_DESCRIPTOR":{
                "text":this.eit.value.eitPresentSection.eitEvents.EXTENDED_EVENT_DESCRIPTOR.text,
                "lang":this.eit.value.eitPresentSection.eitEvents.EXTENDED_EVENT_DESCRIPTOR.lang,
                "items":[]
              },
              "CONTENT_DESCRIPTOR":[{
                "content_nibble_level_1":this.eit.value.eitPresentSection.eitEvents.CONTENT_DESCRIPTOR.content_nibble_level_1,
                "content_nibble_level_2":this.eit.value.eitPresentSection.eitEvents.CONTENT_DESCRIPTOR.content_nibble_level_2
              }],
              "PARENTAL_RATING_DESCRIPTOR":{
                "country_code":this.eit.value.eitPresentSection.eitEvents.PARENTAL_RATING_DESCRIPTOR.country_code,
                "age":new Number(this.eit.value.eitPresentSection.eitEvents.PARENTAL_RATING_DESCRIPTOR.age),
              },
              "PRIVATE_DESCRIPTOR":[
                {
                  "tag":"0xAA",
                  "token":""
                }
              ],
              "COMPONENT_DESCRIPTOR":[
                {
                  "stream_content":"0x05",
                  "component_type":"0x01",
                  "set_component_tag":46,
                  "text":"aspect ratio",
                  "lang":"fre"
                },
                {
                  "stream_content":"0x06",
                  "component_type":"0x03",
                  "set_component_tag":46,
                  "text":"cx",
                  "lang":"fre"
                },
                {
                  "stream_content":"0x03",
                  "component_type":"0x10",
                  "set_component_tag":46,
                  "text":"subtitle",
                  "lang":"fre"
                }
              ]
            }
          ]
        },
      "eitFollowingSection":
      {
        "eitEvents":[
          {
            "SHORT_EVENT_DESCRIPTOR":{
              "event_name":this.eit.value.eitFollowingSection.eitEvents.SHORT_EVENT_DESCRIPTOR.event_name,
              "event_text":this.eit.value.eitFollowingSection.eitEvents.SHORT_EVENT_DESCRIPTOR.event_text,
              "event_lang":this.eit.value.eitFollowingSection.eitEvents.SHORT_EVENT_DESCRIPTOR.event_lang
            },
            "EXTENDED_EVENT_DESCRIPTOR":{
              "text":this.eit.value.eitFollowingSection.eitEvents.EXTENDED_EVENT_DESCRIPTOR.text,
              "lang":this.eit.value.eitFollowingSection.eitEvents.EXTENDED_EVENT_DESCRIPTOR.lang,
              "items":[]
            },
            "CONTENT_DESCRIPTOR":[{
              "content_nibble_level_1":this.eit.value.eitFollowingSection.eitEvents.CONTENT_DESCRIPTOR.content_nibble_level_1,
              "content_nibble_level_2":this.eit.value.eitFollowingSection.eitEvents.CONTENT_DESCRIPTOR.content_nibble_level_2
            }],
            "PARENTAL_RATING_DESCRIPTOR":{
              "country_code":this.eit.value.eitFollowingSection.eitEvents.PARENTAL_RATING_DESCRIPTOR.country_code,
              "age":new Number(this.eit.value.eitFollowingSection.eitEvents.PARENTAL_RATING_DESCRIPTOR.age),
            },
            "PRIVATE_DESCRIPTOR":[
              {
                "tag":"0xAA",
                "token":""
              }
            ],
            "COMPONENT_DESCRIPTOR":[
              {
                "stream_content":"0x05",
                "component_type":"0x01",
                "set_component_tag":46,
                "text":"aspect ratio",
                "lang":"fre"
              },
              {
                "stream_content":"0x06",
                "component_type":"0x03",
                "set_component_tag":46,
                "text":"audio",
                "lang":"fre"
              },
              {
                "stream_content":"0x03",
                "component_type":"0x10",
                "set_component_tag":46,
                "text":"subtitle",
                "lang":"fre"
              }
            ]
          }
        ]
      }
    };
    this.jsonForm.patchValue({jsonTextArea : JSON.stringify(jsonText)});
  }

  importJson(){

    let json = JSON.parse(this.jsonForm.getRawValue().jsonTextArea);

    this.eit.patchValue({eitPresentSection: { eitEvents :{SHORT_EVENT_DESCRIPTOR : {event_name: json.eitPresentSection.eitEvents[0].SHORT_EVENT_DESCRIPTOR.event_name}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{SHORT_EVENT_DESCRIPTOR : {event_text: json.eitPresentSection.eitEvents[0].SHORT_EVENT_DESCRIPTOR.event_text}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{SHORT_EVENT_DESCRIPTOR : {event_lang: json.eitPresentSection.eitEvents[0].SHORT_EVENT_DESCRIPTOR.event_lang}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{EXTENDED_EVENT_DESCRIPTOR : {text: json.eitPresentSection.eitEvents[0].EXTENDED_EVENT_DESCRIPTOR.text}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{EXTENDED_EVENT_DESCRIPTOR : {lang: json.eitPresentSection.eitEvents[0].EXTENDED_EVENT_DESCRIPTOR.lang}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{CONTENT_DESCRIPTOR : {content_nibble_level_1: json.eitPresentSection.eitEvents[0].CONTENT_DESCRIPTOR.content_nibble_level_1}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{CONTENT_DESCRIPTOR : {content_nibble_level_2: json.eitPresentSection.eitEvents[0].CONTENT_DESCRIPTOR.content_nibble_level_2}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{PARENTAL_RATING_DESCRIPTOR : {country_code: json.eitPresentSection.eitEvents[0].PARENTAL_RATING_DESCRIPTOR.country_code}}}});
    this.eit.patchValue({eitPresentSection: { eitEvents :{PARENTAL_RATING_DESCRIPTOR : {age: json.eitPresentSection.eitEvents[0].PARENTAL_RATING_DESCRIPTOR.age}}}});

    this.eit.patchValue({eitFollowingSection: { eitEvents :{SHORT_EVENT_DESCRIPTOR : {event_name: json.eitFollowingSection.eitEvents[0].SHORT_EVENT_DESCRIPTOR.event_name}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{SHORT_EVENT_DESCRIPTOR : {event_text: json.eitFollowingSection.eitEvents[0].SHORT_EVENT_DESCRIPTOR.event_text}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{SHORT_EVENT_DESCRIPTOR : {event_lang: json.eitFollowingSection.eitEvents[0].SHORT_EVENT_DESCRIPTOR.event_lang}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{EXTENDED_EVENT_DESCRIPTOR : {text: json.eitFollowingSection.eitEvents[0].EXTENDED_EVENT_DESCRIPTOR.text}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{EXTENDED_EVENT_DESCRIPTOR : {lang: json.eitFollowingSection.eitEvents[0].EXTENDED_EVENT_DESCRIPTOR.lang}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{CONTENT_DESCRIPTOR : {content_nibble_level_1: json.eitFollowingSection.eitEvents[0].CONTENT_DESCRIPTOR.content_nibble_level_1}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{CONTENT_DESCRIPTOR : {content_nibble_level_2: json.eitFollowingSection.eitEvents[0].CONTENT_DESCRIPTOR.content_nibble_level_2}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{PARENTAL_RATING_DESCRIPTOR : {country_code: json.eitFollowingSection.eitEvents[0].PARENTAL_RATING_DESCRIPTOR.country_code}}}});
    this.eit.patchValue({eitFollowingSection: { eitEvents :{PARENTAL_RATING_DESCRIPTOR : {age: json.eitFollowingSection.eitEvents[0].PARENTAL_RATING_DESCRIPTOR.age}}}});
    

  }
  
  prettyJson(e){
    console.log(e.checked);
    if(e.checked){
      this.jsonText =JSON.parse(this.jsonForm.getRawValue().jsonTextArea);
      this.enabledPrettyJson = true;
    }else{
      this.enabledPrettyJson = false;
    }
  } 
}


