import $ from 'jquery';
import {exportAsExcel} from './export';
import '../style/index.css';
import img from './image';

// dom元素-中心十字
const $plusChar = $('#plus-char');
// dom元素-提示框
const $alertMessage = $('#alertMessage');
// dom元素-介绍语
const $introduction = $('#introduction');
// 固定顺序实验的实验计数
let commonTestCount = 0;
// 反应时间记录
let timeRecord;
// 实验结果整合Array
const testResultArray = [
  'name,result,avrTime'
];
// 要导出的excel的sheet信息
const excelData = [];

// 小鱼-dom元素
const $fish = $('#fish-experiment');
// 小鱼-练习array
const fishTestArray = [
  {
    question: [{area: 'e', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [{area: 'e', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.leftFish},
      {area: 'c', pic: img.leftFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.leftFish},
      {area: 'i', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.rightFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.leftFish},
      {area: 'c', pic: img.leftFish},
      {area: 'e', pic: img.rightFish},
      {area: 'g', pic: img.leftFish},
      {area: 'i', pic: img.leftFish}],
    answer: 'k'
  }];
// 小鱼-实验array
const fishArray = [
  {
    question: [{area: 'e', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.leftFish},
      {area: 'c', pic: img.leftFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.leftFish},
      {area: 'i', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [{area: 'e', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [{area: 'e', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.leftFish},
      {area: 'c', pic: img.leftFish},
      {area: 'e', pic: img.rightFish},
      {area: 'g', pic: img.leftFish},
      {area: 'i', pic: img.leftFish}],
    answer: 'k'
  },
  {
    question: [{area: 'e', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.rightFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.rightFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [{area: 'e', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.rightFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.leftFish},
      {area: 'c', pic: img.leftFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.leftFish},
      {area: 'i', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.leftFish},
      {area: 'c', pic: img.leftFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.leftFish},
      {area: 'i', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.rightFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [{area: 'e', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [{area: 'e', pic: img.leftFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [{area: 'e', pic: img.rightFish}],
    answer: 'k'
  },
  {
    question: [
      {area: 'a', pic: img.rightFish},
      {area: 'c', pic: img.rightFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.rightFish},
      {area: 'i', pic: img.rightFish}],
    answer: 'd'
  },
  {
    question: [
      {area: 'a', pic: img.leftFish},
      {area: 'c', pic: img.leftFish},
      {area: 'e', pic: img.leftFish},
      {area: 'g', pic: img.leftFish},
      {area: 'i', pic: img.leftFish}],
    answer: 'd'
  }];
// 小鱼-实验结果array
const fishResult = [
  'trial,fish1,fish2,targetFish,fish3,fish4,corrAns,ans,time',
  'eutral_right,,,rightFish.png,,,k,',
  'ongurent_left,leftFish.png,leftFish.png,leftFish.png,leftFish.png,leftFish.png,d,',
  'ncongurent_left,rightFish.png,rightFish.png,leftFish.png,rightFish.png,rightFish.png,d,',
  'eutral_right,,,rightFish.png,,,k,',
  'ncongurent_left,rightFish.png,rightFish.png,leftFish.png,rightFish.png,rightFish.png,d,',
  'eutral_left,,,leftFish.png,,,d,',
  'ncongurent_right,leftFish.png,leftFish.png,rightFish.png,leftFish.png,leftFish.png,k,',
  'eutral_left,,,leftFish.png,,,d,',
  'ongurent_right,rightFish.png,rightFish.png,rightFish.png,rightFish.png,rightFish.png,k,',
  'ongurent_right,rightFish.png,rightFish.png,rightFish.png,rightFish.png,rightFish.png,k,',
  'ncongurent_left,rightFish.png,rightFish.png,leftFish.png,rightFish.png,rightFish.png,d,',
  'eutral_right,,,rightFish.png,,,k,',
  'ongurent_right,rightFish.png,rightFish.png,rightFish.png,rightFish.png,rightFish.png,k,',
  'ongurent_left,leftFish.png,leftFish.png,leftFish.png,leftFish.png,leftFish.png,d,',
  'ongurent_left,leftFish.png,leftFish.png,leftFish.png,leftFish.png,leftFish.png,d,',
  'ongurent_right,rightFish.png,rightFish.png,rightFish.png,rightFish.png,rightFish.png,k,',
  'eutral_left,,,leftFish.png,,,d,',
  'ncongurent_right,leftFish.png,leftFish.png,rightFish.png,leftFish.png,leftFish.png,k,',
  'ncongurent_right,leftFish.png,leftFish.png,rightFish.png,leftFish.png,leftFish.png,k,',
  'eutral_left,,,leftFish.png,,,d,',
  'ncongurent_right,leftFish.png,leftFish.png,rightFish.png,leftFish.png,leftFish.png,k,',
  'eutral_right,,,rightFish.png,,,k,',
  'ncongurent_left,rightFish.png,rightFish.png,leftFish.png,rightFish.png,rightFish.png,d,',
  'ongurent_left,leftFish.png,leftFish.png,leftFish.png,leftFish.png,leftFish.png,d,'
];
// 小鱼-正确反应延迟
const fishRightTime = [];

// 规则任务-dom元素
const $rule = $('#rule-experiment');
// 规则任务-实验列表
const ruleMap = [
  {question: img.oneRedDot, colour: 'one_red_dot', number: 'one_red_dot', shape: 'one_red_dot'},
  {question: img.twoRedDots, colour: 'one_red_dot', number: 'two_yellow_triangles', shape: 'one_red_dot'},
  {question: img.threeRedDots, colour: 'one_red_dot', number: 'three_green_crosses', shape: 'one_red_dot'},
  {question: img.fourRedDots, colour: 'one_red_dot', number: 'four_blue_stars', shape: 'one_red_dot'},
  {question: img.oneYellowDot, colour: 'two_yellow_triangles', number: 'one_red_dot', shape: 'one_red_dot'},
  {question: img.twoYellowDots, colour: 'two_yellow_triangles', number: 'two_yellow_triangles', shape: 'one_red_dot'},
  {question: img.threeYellowDots, colour: 'two_yellow_triangles', number: 'three_green_crosses', shape: 'one_red_dot'},
  {question: img.fourYellowDots, colour: 'two_yellow_triangles', number: 'four_blue_stars', shape: 'one_red_dot'},
  {question: img.oneGreenDot, colour: 'three_green_crosses', number: 'one_red_dot', shape: 'one_red_dot'},
  {question: img.twoGreenDots, colour: 'three_green_crosses', number: 'two_yellow_triangles', shape: 'one_red_dot'},
  {question: img.threeGreenDots, colour: 'three_green_crosses', number: 'three_green_crosses', shape: 'one_red_dot'},
  {question: img.fourGreenDots, colour: 'three_green_crosses', number: 'four_blue_stars', shape: 'one_red_dot'},
  {question: img.oneBlueDot, colour: 'four_blue_stars', number: 'one_red_dot', shape: 'one_red_dot'},
  {question: img.twoBlueDots, colour: 'four_blue_stars', number: 'two_yellow_triangles', shape: 'one_red_dot'},
  {question: img.threeBlueDots, colour: 'four_blue_stars', number: 'three_green_crosses', shape: 'one_red_dot'},
  {question: img.fourBlueDots, colour: 'four_blue_stars', number: 'four_blue_stars', shape: 'one_red_dot'},
  {question: img.oneRedCross, colour: 'one_red_dot', number: 'one_red_dot', shape: 'three_green_crosses'},
  {question: img.twoRedCrosses, colour: 'one_red_dot', number: 'two_yellow_triangles', shape: 'three_green_crosses'},
  {question: img.threeRedCrosses, colour: 'one_red_dot', number: 'three_green_crosses', shape: 'three_green_crosses'},
  {question: img.fourRedCrosses, colour: 'one_red_dot', number: 'four_blue_stars', shape: 'three_green_crosses'},
  {question: img.oneYellowCross, colour: 'two_yellow_triangles', number: 'one_red_dot', shape: 'three_green_crosses'},
  {
    question: img.twoYellowCrosses,
    colour: 'two_yellow_triangles',
    number: 'two_yellow_triangles',
    shape: 'three_green_crosses'
  },
  {
    question: img.threeYellowCrosses,
    colour: 'two_yellow_triangles',
    number: 'three_green_crosses',
    shape: 'three_green_crosses'
  },
  {
    question: img.fourYellowCrosses,
    colour: 'two_yellow_triangles',
    number: 'four_blue_stars',
    shape: 'three_green_crosses'
  },
  {question: img.oneGreenCross, colour: 'three_green_crosses', number: 'one_red_dot', shape: 'three_green_crosses'},
  {
    question: img.twoGreenCrosses,
    colour: 'three_green_crosses',
    number: 'two_yellow_triangles',
    shape: 'three_green_crosses'
  },
  {
    question: img.threeGreenCrosses,
    colour: 'three_green_crosses',
    number: 'three_green_crosses',
    shape: 'three_green_crosses'
  },
  {
    question: img.fourGreenCrosses,
    colour: 'three_green_crosses',
    number: 'four_blue_stars',
    shape: 'three_green_crosses'
  },
  {question: img.oneBlueCross, colour: 'four_blue_stars', number: 'one_red_dot', shape: 'three_green_crosses'},
  {
    question: img.twoBlueCrosses,
    colour: 'four_blue_stars',
    number: 'two_yellow_triangles',
    shape: 'three_green_crosses'
  },
  {
    question: img.threeBlueCrosses,
    colour: 'four_blue_stars',
    number: 'three_green_crosses',
    shape: 'three_green_crosses'
  },
  {question: img.fourBlueCrosses, colour: 'four_blue_stars', number: 'four_blue_stars', shape: 'three_green_crosses'},
  {question: img.oneRedStar, colour: 'one_red_dot', number: 'one_red_dot', shape: 'four_blue_stars'},
  {question: img.twoRedStars, colour: 'one_red_dot', number: 'two_yellow_triangles', shape: 'four_blue_stars'},
  {question: img.threeRedStars, colour: 'one_red_dot', number: 'three_green_crosses', shape: 'four_blue_stars'},
  {question: img.fourRedStars, colour: 'one_red_dot', number: 'four_blue_stars', shape: 'four_blue_stars'},
  {question: img.oneYellowStar, colour: 'two_yellow_triangles', number: 'one_red_dot', shape: 'four_blue_stars'},
  {
    question: img.twoYellowStars,
    colour: 'two_yellow_triangles',
    number: 'two_yellow_triangles',
    shape: 'four_blue_stars'
  },
  {
    question: img.threeYellowStars,
    colour: 'two_yellow_triangles',
    number: 'three_green_crosses',
    shape: 'four_blue_stars'
  },
  {question: img.fourYellowStars, colour: 'two_yellow_triangles', number: 'four_blue_stars', shape: 'four_blue_stars'},
  {question: img.oneGreenStar, colour: 'three_green_crosses', number: 'one_red_dot', shape: 'four_blue_stars'},
  {
    question: img.twoGreenStars,
    colour: 'three_green_crosses',
    number: 'two_yellow_triangles',
    shape: 'four_blue_stars'
  },
  {question: img.threeGreenStars, colour: 'three_green_crosses', number: 'three_green_crosses', shape: 'four_blue_stars'},
  {question: img.fourGreenStars, colour: 'three_green_crosses', number: 'four_blue_stars', shape: 'four_blue_stars'},
  {question: img.oneBlueStar, colour: 'four_blue_stars', number: 'one_red_dot', shape: 'four_blue_stars'},
  {question: img.twoBlueStars, colour: 'four_blue_stars', number: 'two_yellow_triangles', shape: 'four_blue_stars'},
  {question: img.threeBlueStars, colour: 'four_blue_stars', number: 'three_green_crosses', shape: 'four_blue_stars'},
  {question: img.fourBlueStars, colour: 'four_blue_stars', number: 'four_blue_stars', shape: 'four_blue_stars'},
  {question: img.oneRedTriangle, colour: 'one_red_dot', number: 'one_red_dot', shape: 'two_yellow_triangles'},
  {question: img.twoRedTriangles, colour: 'one_red_dot', number: 'two_yellow_triangles', shape: 'two_yellow_triangles'},
  {question: img.threeRedTriangles, colour: 'one_red_dot', number: 'three_green_crosses', shape: 'two_yellow_triangles'},
  {question: img.fourRedTriangles, colour: 'one_red_dot', number: 'four_blue_stars', shape: 'two_yellow_triangles'},
  {
    question: img.oneYellowTriangle,
    colour: 'two_yellow_triangles',
    number: 'one_red_dot',
    shape: 'two_yellow_triangles'
  },
  {
    question: img.twoYellowTriangles,
    colour: 'two_yellow_triangles',
    number: 'two_yellow_triangles',
    shape: 'two_yellow_triangles'
  },
  {
    question: img.threeYellowTriangles,
    colour: 'two_yellow_triangles',
    number: 'three_green_crosses',
    shape: 'two_yellow_triangles'
  },
  {
    question: img.fourYellowTriangles,
    colour: 'two_yellow_triangles',
    number: 'four_blue_stars',
    shape: 'two_yellow_triangles'
  },
  {question: img.oneGreenTriangle, colour: 'three_green_crosses', number: 'one_red_dot', shape: 'two_yellow_triangles'},
  {
    question: img.twoGreenTriangles,
    colour: 'three_green_crosses',
    number: 'two_yellow_triangles',
    shape: 'two_yellow_triangles'
  },
  {
    question: img.threeGreenTriangles,
    colour: 'three_green_crosses',
    number: 'three_green_crosses',
    shape: 'two_yellow_triangles'
  },
  {
    question: img.fourGreenTriangles,
    colour: 'three_green_crosses',
    number: 'four_blue_stars',
    shape: 'two_yellow_triangles'
  },
  {question: img.oneBlueTriangle, colour: 'four_blue_stars', number: 'one_red_dot', shape: 'two_yellow_triangles'},
  {
    question: img.twoBlueTriangles,
    colour: 'four_blue_stars',
    number: 'two_yellow_triangles',
    shape: 'two_yellow_triangles'
  },
  {
    question: img.threeBlueTriangles,
    colour: 'four_blue_stars',
    number: 'three_green_crosses',
    shape: 'two_yellow_triangles'
  },
  {question: img.fourBlueTriangles, colour: 'four_blue_stars', number: 'four_blue_stars', shape: 'two_yellow_triangles'}
];
// 规则任务-规则表
const rules = ['colour', 'number', 'shape'];
// 规则任务-每个规则实验次数
const ruleNum = 10;
// 规则任务-开始计算反应时的起始试次
const ruleStartCalNum = 3;
// 规则任务-实验Array
const ruleArray = [];
// 规则任务-实验结果正误
let ruleFinalResult = true;
// 规则任务-实验结果Array
const ruleResultArray = [
  'rule,question,corrAnd,ans,time'
];
// 规则任务-正确反应延迟
const ruleRightTime = [];

// 转换任务-dom元素
const $transform = $('#transform-experiment');
// 转换任务-练习array
const transformTestArray = [
  {trial: 9, area: 'a', value: '7a', answer: 'k'},
  {trial: 9, area: 'b', value: '2H', answer: 'd'},
  {trial: 9, area: 'c', value: '4E', answer: 'k'},
  {trial: 9, area: 'd', value: '8g', answer: 'd'},
  {trial: 9, area: 'a', value: '1G', answer: 'd'},
  {trial: 9, area: 'b', value: '6e', answer: 'k'},
  {trial: 9, area: 'c', value: '3A', answer: 'k'},
  {trial: 9, area: 'd', value: '9h', answer: 'd'}
];
// 转换任务-实验array
const transformArray = [
  {trial: 0, area: 'a', value: '8h', answer: 'k'},
  {trial: 0, area: 'b', value: '3H', answer: 'd'},
  {trial: 3, area: 'c', value: '9a', answer: 'd'},
  {trial: 0, area: 'd', value: '6g', answer: 'd'},
  {trial: 3, area: 'a', value: '6g', answer: 'k'},
  {trial: 0, area: 'b', value: '2E', answer: 'd'},
  {trial: 3, area: 'c', value: '1G', answer: 'k'},
  {trial: 0, area: 'd', value: '3H', answer: 'k'},
  {trial: 3, area: 'a', value: '4H', answer: 'd'},
  {trial: 0, area: 'b', value: '8h', answer: 'k'},
  {trial: 3, area: 'c', value: '6g', answer: 'd'},
  {trial: 0, area: 'd', value: '1G', answer: 'k'},
  {trial: 3, area: 'a', value: '9a', answer: 'k'},
  {trial: 0, area: 'b', value: '7e', answer: 'k'},
  {trial: 3, area: 'c', value: '3H', answer: 'k'},
  {trial: 0, area: 'd', value: '8h', answer: 'd'},
  {trial: 3, area: 'a', value: '3H', answer: 'd'},
  {trial: 0, area: 'b', value: '1G', answer: 'd'},
  {trial: 3, area: 'c', value: '2E', answer: 'k'},
  {trial: 0, area: 'd', value: '7e', answer: 'd'},
  {trial: 3, area: 'a', value: '7e', answer: 'k'},
  {trial: 0, area: 'b', value: '9a', answer: 'k'},
  {trial: 3, area: 'c', value: '7e', answer: 'd'},
  {trial: 0, area: 'd', value: '2E', answer: 'k'}
];
// 转换任务-实验结果array
const transformResult = [
  'trial,lu,ru,rd,ld,corrAns,ans,time',
  '0,8h,,,,k,',
  '0,,3H,,,d,',
  '3,,,9a,,d,',
  '0,,,,6g,d,',
  '3,6g,,,,k,',
  '0,,2E,,,d,',
  '3,,,1G,,k,',
  '0,,,,3H,k,',
  '3,4H,,,,d,',
  '0,,8h,,,k,',
  '3,,,6g,,d,',
  '0,,,,1G,k,',
  '3,9a,,,,k,',
  '0,,7e,,,k,',
  '3,,,3H,,k,',
  '0,,,,8h,d,',
  '3,3H,,,,d,',
  '0,,1G,,,d,',
  '3,,,2E,,k,',
  '0,,,,7e,d,',
  '3,7e,,,,k,',
  '0,,9a,,,k,',
  '3,,,7e,,d,',
  '0,,,,2E,k,'
];
// 转换任务-正确反应延迟
const transformRightTime = [];

// 工作记忆-dom元素
const $memory = $('#memory-experiment');
// 工作记忆-memory子元素
const memoryChildren = $memory.children();
// 工作记忆-memory总数
const memoryTotalNum = 25;
// 工作记忆-最大出错次数
const maxErrorNum = 3;
// 工作记忆-最大memory数量
const maxMemoryNum = 12;
// 工作记忆-单次实验的memory序号临时存储
const memoryArray = [];
// 工作记忆-当前进行到的memory数量
let curMemoryNum = 3;
// 工作记忆-单次实验的点击次数临时存储
let curMemoryClickNum = 0;
// 工作记忆-单次实验的错误数量临时存储
let curMemoryErrorNum = 0;
// 工作记忆-是否可以点击状态
let curMemoryReady = false;
// 本次实验是否出错
let curMemoryResult = true;
// 工作记忆-点击正确的次数
let memoryClickRightNum = 0;
// 工作记忆-总共的点击次数
let memoryClickTotalNum = 0;
// 工作记忆-完成的最大memory数量
let memoryMaxNum = 0;
// 工作记忆-实验结果array
const memoryResult = [
  'memoryNum,result'
];

// 注意力-dom元素
const $attention = $('#attention-experiment');
// 注意力-行数
const attentionRowNum = 20;
// 注意力-列数
const attentionColumnNum = 12;
// 注意力-选项最大值
const attentionMaxItem = 9;
// 注意力-目标值
const attentionTarget = 3;
// 注意力-目标值数量
const attentionNumber = 40;
// 注意力-限时
const attentionMaxTime = 120000;
// 注意力-选取值Array
const attentionSelectedArray = [];
// 注意力-实验结果Array
const attentionResult = [
  'name,value'
];

$(function () {
  init();
})

/**
 * 实验主体逻辑
 */
function init() {
  // 展示选择年龄段
  const $chooseAge = $('#choose-age');
  $chooseAge.show();
  $('#before-five').on('click', function () {
    $chooseAge.hide();
    // 展示欢迎页
    updateSrcAndShow($introduction, img.welcome);
    // 开始实验
    fishTest()
      .then(ruleTest)
      .then(memoryTest)
      .then(attentionTest)
      .then(() => {
        return endTest([
          {
            name: '各实验结果',
            data: testResultArray
          },
          {
            name: '小鱼游戏',
            data: fishResult
          },
          {
            name: '规则任务',
            data: ruleResultArray
          },
          {
            name: '工作记忆',
            data: memoryResult
          },
          {
            name: '注意力',
            data: attentionResult
          }
        ])
      });
  })
  $('#after-five').on('click', function () {
    $chooseAge.hide();
    // 展示欢迎页
    updateSrcAndShow($introduction, img.welcome);
    // 开始实验
    fishTest()
      .then(ruleTest)
      .then(transformTest)
      .then(memoryTest)
      .then(attentionTest)
      .then(() => {
        return endTest([
          {
            name: '各实验结果',
            data: testResultArray
          },
          {
            name: '小鱼游戏',
            data: fishResult
          },
          {
            name: '规则任务',
            data: ruleResultArray
          },
          {
            name: '转换任务',
            data: transformResult
          },
          {
            name: '工作记忆',
            data: memoryResult
          },
          {
            name: '注意力',
            data: attentionResult
          }
        ])
      });
  })
}

/**
 * 小鱼实验
 */
function fishTest() {
  return toPic(' ', null, $introduction, img.fish)
    .then(function () {
      return testStart(' ', $introduction, 'fishTest')
    })
    .then(function () {
      return commonTestRefresh(true, fishTestArray, $fish, 'fish')
    })
    .then(function () {
      return testFinish($fish, $introduction, img.start)
    })
    .then(function () {
      return testStart(' ', $introduction, 'fish')
    })
    .then(function () {
      return commonTestRefresh(false, fishArray, $fish, 'fish')
    })
    .then(function () {
      return testFinish($fish, $introduction, img.fishFinish)
    });
}

/**
 * 规则实验
 */
function ruleTest() {
  return toPic(' ', null, $introduction, img.rule1)
    .then(function () {
      return toPic(' ', null, $introduction, img.rule2)
    })
    .then(function () {
      return toPic(' ', null, $introduction, img.rule3)
    })
    .then(function () {
      return toPic(' ', null, $introduction, img.rule4)
    })
    .then(function () {
      return toPic(' ', null, $introduction, img.rule5)
    })
    .then(function () {
      return toPic(' ', null, $introduction, img.rule6)
    })
    .then(function () {
      return toPic(' ', null, $introduction, img.rule7)
    })
    .then(function () {
      return toPic(' ', null, $introduction, img.rule8)
    })
    .then(function () {
      return toPic(' ', null, $introduction, img.rule9)
    })
    .then(function () {
      return testStart(' ', $introduction, 'rule')
    })
    .then(function () {
      return ruleTestRefresh()
    })
    .then(function () {
      return testFinish($rule, $introduction, img.ruleFinish)
    })
}

/**
 * 转换实验
 */
function transformTest() {
  return toPic(' ', null, $introduction, img.transform1)
    .then(function () {
      return toPic(' ', null, $introduction, img.transform2)
    })
    .then(function () {
      return toPic('d', null, $introduction, img.transform3)
    })
    .then(function () {
      return toPic('k', null, $introduction, img.transform4)
    })
    .then(function () {
      return testStart(' ', $introduction, 'transformTest')
    })
    .then(function () {
      return commonTestRefresh(true, transformTestArray, $transform, 'transform')
    })
    .then(function () {
      return testFinish($transform, $introduction, img.start)
    })
    .then(function () {
      return testStart(' ', $introduction, 'transform')
    })
    .then(function () {
      return commonTestRefresh(false, transformArray, $transform, 'transform')
    })
    .then(function () {
      return testFinish($transform, $introduction, img.transformFinish)
    })
}

/**
 * 记忆实验
 */
function memoryTest() {
  return toPic(' ', null, $introduction, img.memory)
    .then(function () {
      return testStart(' ', $introduction, 'memory')
    })
    .then(function () {
      return memoryTestRefresh(true)
    })
    .then(function () {
      return testFinish($memory, $introduction, img.start)
    })
    .then(function () {
      return testStart(' ', $introduction, 'memory')
    })
    .then(function () {
      return memoryTestRefresh(false)
    })
    .then(function () {
      return testFinish($memory, $introduction, img.memoryFinish)
    })
}

/**
 * 注意力实验
 */
function attentionTest() {
  return toPic(' ', null, $introduction, img.attention)
    .then(function () {
      return testStart(' ', $introduction, 'attention')
    })
    .then(function () {
      return attentionTestRefresh()
    })
    .then(function () {
      return testFinish($attention, $introduction, img.attentionFinish)
    })
}

/**
 * 实验结束
 */
function endTest(results) {
  return toPic(' ', null, $introduction, img.end)
    .then(function () {
      exportAsExcel({
        name: '实验结果',
        sheets: results
      })
    });
}

/**
 * 跳转到图片展示
 * @param keyDownValue 展示图片的触发按键
 * @param $oldElement  需要隐藏的元素
 * @param $newElement  需要展示的元素
 * @param image        图片
 */
function toPic(keyDownValue, $oldElement, $newElement, image) {
  return new Promise(
    function (resolve) {
      $(document).on('keydown', function (e) {
        if (e.key === keyDownValue) {
          $(document).off('keydown');
          $oldElement && $oldElement.hide();
          updateSrcAndShow($newElement, image);
          resolve();
        }
      });
    }
  );
}

/**
 * 更新图片路径并展示图片
 * @param $element 图片元素
 * @param image 图片名称
 */
function updateSrcAndShow($element, image) {
  $element.attr('src', image);
  $element.show();
}

/**
 * 实验开始，第一次初始化实验环境
 * 隐藏实验介绍，取消绑定之前的按键事件，重置实验计数，初始化实验环境
 * @param keyDownValue 进入实验的触发按键
 * @param $oldElement  进入实验时需要隐藏的元素
 * @param testName     实验名称
 */
function testStart(keyDownValue, $oldElement, testName) {
  return new Promise(
    function (resolve) {
      if (testName === 'rule') {
        initRule();
      }
      $(document).on('keydown', function (e) {
        if (e.key === keyDownValue) {
          $(document).off('keydown');
          $oldElement && $oldElement.hide();
          commonTestCount = 0;
          if (testName === 'fishTest') {
            showFish(fishTestArray);
          } else if (testName === 'fish') {
            showFish(fishArray);
          } else if (testName === 'rule') {
            showRule();
          } else if (testName === 'transformTest') {
            showTransform(transformTestArray);
          } else if (testName === 'transform') {
            showTransform(transformArray);
          } else if (testName === 'memory') {
            showMemory(curMemoryNum);
          } else if (testName === 'attention') {
            showAttention();
          }
          resolve();
        }
      });
    }
  );
}

/**
 * 实验结束
 * 解绑实验绑定的点击事件，实验结束语展示
 * @param $oldElement 实验的dom
 * @param $newElement 实验结束语的dom
 * @param image       实验结束语的图片
 */
function testFinish($oldElement, $newElement, image) {
  return new Promise(
    function (resolve) {
      $(document).off('keydown');
      $oldElement && $oldElement.hide();
      updateSrcAndShow($newElement, image);
      resolve();
    }
  );
}

/**
 * 固定顺序的实验刷新
 * @param isPractise   是否是练习（练习需要给出正确错误反馈，非练习需要在输出array中记录实验结果）
 * @param array        固定顺序实验的数组
 * @param $element     实验的dom元素（dom不展示时点击事件失效）
 * @param testName     实验名称
 */
function commonTestRefresh(isPractise, array, $element, testName) {
  return new Promise(
    function (resolve) {
      $(document).on('keydown', async function (e) {
        const reactionTime = calTestTime();
        if ($element.css('display') !== 'none' && $alertMessage.css('display') === 'none' && (e.key === 'd' || e.key === 'k')) {
          let result = array[commonTestCount - 1].answer === e.key;
          if (isPractise) {
            await showAlert(result);
          } else {
            if (testName === 'fish') {
              fishResult[commonTestCount] += result;
              fishResult[commonTestCount] += ',';
              fishResult[commonTestCount] += reactionTime;
              if (result) {
                fishRightTime.push(reactionTime);
              }
            } else if (testName === 'transform') {
              transformResult[commonTestCount] += result;
              transformResult[commonTestCount] += ',';
              transformResult[commonTestCount] += reactionTime;
              if (result) {
                transformRightTime.push(reactionTime);
              }
            }
          }
          if (commonTestCount >= array.length) {
            if (!isPractise && testName === 'fish') {
              const correctRate = fishRightTime.length / fishArray.length;
              let avrTime = 0;
              if (fishRightTime.length) {
                let timeSum = 0;
                for (const time of fishRightTime) {
                  timeSum += time;
                }
                avrTime = timeSum / fishRightTime.length;
              }
              testResultArray.push('fish,' + correctRate + ',' + avrTime);
            } else if (!isPractise && testName === 'transform') {
              const correctRate = transformRightTime.length / transformArray.length;
              let avrTime = 0;
              if (transformRightTime.length) {
                let timeSum = 0;
                for (const time of transformRightTime) {
                  timeSum += time;
                }
                avrTime = timeSum / transformRightTime.length;
              }
              testResultArray.push('transform,' + correctRate + ',' + avrTime);
            }
            resolve();
          } else {
            if (testName === 'fish') {
              showFish(array);
            } else if (testName === 'transform') {
              showTransform(array);
            }
          }
        }
      });
    }
  );
}

/**
 * 规则任务实验刷新
 * 四个选项绑定点击事件
 */
function ruleTestRefresh() {
  return new Promise(
    function (resolve) {
      $rule.find('.rule-option').on('click', async function () {
        if ($rule.css('display') !== 'none' && $alertMessage.css('display') === 'none') {
          // 计算反应延迟
          const reactionTime = calTestTime();
          // 判断正误
          const chosenPic = $(this).attr('alt');
          const curTest = ruleArray[commonTestCount - 1];
          const result = curTest.answer === chosenPic;
          // 提示正误
          await showAlert(result);
          if (result && (commonTestCount % ruleNum) >= ruleStartCalNum) {
            ruleRightTime.push(reactionTime);
          }
          if ((commonTestCount - 1) % ruleNum >= (ruleNum - 3) && !result) {
            ruleFinalResult = false;
          }
          // 记录本次结果
          ruleResultArray[commonTestCount] += (result + ',' + reactionTime);
          // 下一道测试或结束实验
          if (commonTestCount >= ruleArray.length) {
            ruleResultArray.push('finalResult,' + ruleFinalResult);
            const correctRate = ruleRightTime.length / ruleArray.length;
            let avrTime = 0;
            if (ruleRightTime.length) {
              let timeSum = 0;
              for (const time of ruleRightTime) {
                timeSum += time;
              }
              avrTime = timeSum / ruleRightTime.length;
            }
            testResultArray.push('rule,' + correctRate + ',' + avrTime);
            resolve();
          } else {
            showRule();
          }
        }
      });
    }
  );
}

/**
 * 工作记忆实验刷新
 * 实验的每个memory绑定点击事件
 * @param isPractise 是否是练习
 */
function memoryTestRefresh(isPractise) {
  return new Promise(
    function (resolve) {
      memoryClickRightNum = 0;
      memoryClickTotalNum = 0;
      $memory.children().off('click').on('click', async function (e) {
        if (curMemoryReady && $alertMessage.css('display') === 'none') {
          let $curmemory = $(e.target);
          let memoryIndex = +$curmemory.attr("id");
          $curmemory.addClass('selected');
          if (memoryArray.length) {
            if (memoryArray[0] === memoryIndex) {
              memoryClickRightNum++;
            } else {
              curMemoryResult = false;
            }
            memoryArray.shift();
            memoryClickTotalNum++;
            curMemoryClickNum++;
          }
          // 本次结束
          if (curMemoryClickNum >= curMemoryNum) {
            if (isPractise) {
              // 实验则展示正误，进入介绍页
              await showAlert(curMemoryResult);
              resolve();
            } else {
              // 记录本次点击结果
              memoryResult.push(curMemoryNum + ',' + curMemoryResult);
              if (!curMemoryResult) {
                curMemoryResult = true;
                // 错误，三次内刷新继续，三次以上结束实验
                curMemoryErrorNum++;
                // 达到最大错误次数，结束
                if (curMemoryErrorNum >= maxErrorNum) {
                  memoryResult.push('clickRightNumber,' + memoryClickRightNum);
                  memoryResult.push('clickTotalNumber,' + memoryClickTotalNum);
                  memoryResult.push('correctRate,' + memoryClickRightNum / memoryClickTotalNum);
                  memoryResult.push('maxNum,' + memoryMaxNum);
                  testResultArray.push('memory,' + memoryClickRightNum / memoryClickTotalNum);
                  await elementAlert('答错啦...', '很遗憾，错误三次，游戏结束~~');
                  resolve();
                } else {
                  await elementAlert('答错啦...', '错误' + curMemoryErrorNum + '次了，加油呀~~');
                  showMemory(curMemoryNum);
                }
              } else if (curMemoryNum === maxMemoryNum) {
                // 正确，达到最大限制，完成
                memoryMaxNum = curMemoryNum;
                memoryResult.push('correctRate,' + memoryClickRightNum / memoryClickTotalNum);
                memoryResult.push('maxNum,' + memoryMaxNum);
                testResultArray.push('memory,' + memoryClickRightNum / memoryClickTotalNum);
                await elementAlert('答对啦！', '太厉害了，你完成了所有挑战');
                resolve();
              } else {
                // 正确，memory数+1进入下一级
                memoryMaxNum = curMemoryNum;
                curMemoryNum++;
                curMemoryErrorNum = 0;
                await elementAlert('答对啦！', '我们来加大难度吧！接下来要记住' + curMemoryNum + '个红色方块哟~~');
                showMemory(curMemoryNum);
              }
            }
          }
        }
      });
    }
  );
}

/**
 * 注意力实验-刷新
 */
function attentionTestRefresh() {
  return new Promise(
    function (resolve) {
      window.setTimeout(async function () {
        await elementAlert('时间到啦!', '时间到啦，游戏结束啦~');
        calAttentionResult();
        resolve();
      }, attentionMaxTime);
      $attention.find('.attention-item').on('click', function () {
        if ($attention.css('display') !== 'none' && $alertMessage.css('display') === 'none') {
          let $this = $(this);
          attentionSelectedArray.push(+$this.attr('data-val'));
          $this.addClass('selected');
        }
      });
      $attention.find('#attention-finish').on('click', function () {
        calAttentionResult();
        resolve();
      })
    }
  );
}

/**
 * 注意力实验-结果计算
 */
function calAttentionResult() {
  let rightCount = 0;
  let wrongCount = 0;
  for (const cur of attentionSelectedArray) {
    if (+cur === attentionTarget) {
      rightCount++;
    } else {
      wrongCount++;
    }
  }
  const missedCount = attentionNumber - rightCount;
  const score = rightCount - wrongCount - (missedCount / 2);
  attentionResult.push('rightCount,' + rightCount);
  attentionResult.push('wrongCount,' + wrongCount);
  attentionResult.push('missedCount,' + missedCount);
  attentionResult.push('score,' + score);
  testResultArray.push('attention,' + score);
}

/**
 * 小鱼实验-环境初始化
 */
function showFish(array) {
  $fish.hide();
  $fish.empty();
  const cur = array[commonTestCount];
  for (let fish of cur.question) {
    const $fishDiv = $('<div style="grid-area: ' + fish.area + ';"></div>');
    const $fishImg = $('<img height="120" width="180" alt="fish">');
    $fishImg.attr('src', fish.pic);
    $fishDiv.append($fishImg);
    $fish.append($fishDiv);
  }
  commonTestCount++;
  $plusChar.show();
  window.setTimeout(function () {
    $plusChar.hide();
    $fish.show();
    calTestTime(true);
  }, 500);
}

/**
 * 规则实验-实验数据初始化
 */
function initRule() {
  for (const rule of rules) {
    for (let i = 0; i < ruleNum; i++) {
      const randomRule = ruleMap[getRandomNum(ruleMap.length)];
      ruleArray.push({
        question: randomRule.question,
        answer: randomRule[rule]
      })
      ruleResultArray.push(rule + ',' + randomRule.question.match(new RegExp('\\/([^/.]+)\\.JPG$'))[1] + ',' + randomRule[rule] + ',');
    }
  }
}

/**
 * 规则实验-环境初始化
 */
function showRule() {
  $rule.hide();
  const cur = ruleArray[commonTestCount];
  $rule.find('#rule-question').attr('src', cur.question);
  commonTestCount++;
  $plusChar.show();
  window.setTimeout(function () {
    $plusChar.hide();
    $rule.show();
    calTestTime(true);
  }, 500);
}

/**
 * 灵活转换-转换任务实验-环境初始化
 * @param array 当前进行的任务的固定的队列
 */
function showTransform(array) {
  $transform.hide();
  $transform.empty();
  const cur = array[commonTestCount];
  $transform.append('<div class="transform-item" style="grid-area: ' + cur.area + ';">' + cur.value + '</div>')
  commonTestCount++;
  $plusChar.show();
  window.setTimeout(function () {
    $plusChar.hide();
    $transform.show();
    calTestTime(true);
  }, 500);
}

/**
 * 工作记忆实验-环境初始化
 * @param memoryNum 需要记忆的memory数量
 */
function showMemory(memoryNum) {
  curMemoryClickNum = 0;
  curMemoryReady = false;
  memoryArray.splice(0, memoryArray.length);
  while (memoryNum-- > 0) {
    let num = getRandomNum(memoryTotalNum);
    while (memoryArray.indexOf(num) !== -1) {
      num = getRandomNum(memoryTotalNum);
    }
    memoryArray.push(num);
  }
  for (let child of memoryChildren) {
    $(child).removeClass('selected');
  }
  $memory.show();
  window.setTimeout(function () {
    lightMemory(0);
  }, 1000);
}

/**
 * 工作记忆实验-memory依次亮起
 * 使用递归来让memory依次亮起，最后一个memory熄灭后点击事件才生效
 * @param index
 */
function lightMemory(index) {
  if (index > memoryArray.length) {
    return;
  }
  let last = index > 0 ? memoryArray[index - 1] : -1;
  let cur = index < memoryArray.length ? memoryArray[index] : -1;
  last !== -1 && $(memoryChildren[last]).removeClass('lighted');
  cur !== -1 && $(memoryChildren[cur]).addClass('lighted');
  cur !== -1 && console.log("点亮第" + (~~((cur) / 5) + 1) + "行，第" + ((cur) % 5 + 1) + "列的方块");
  if (index >= memoryArray.length) {
    curMemoryReady = true;
  }
  window.setTimeout(function () {
    lightMemory(index + 1);
  }, 1000);
}

/**
 * 注意力实验-环境初始化
 */
function showAttention() {
  // 初始化20个目标值的出现位置
  const targetIndexArray = [];
  const maxIndex = attentionRowNum * attentionColumnNum;
  for (let i = 0; i < attentionNumber; i++) {
    let val = getRandomNum(maxIndex);
    while (targetIndexArray.indexOf(val) > -1) {
      val = getRandomNum(maxIndex);
    }
    targetIndexArray.push(val);
  }

  // 继续生成其他的随机数
  for (let i = 0; i < maxIndex; i++) {
    let val;
    if (targetIndexArray.indexOf(i) > -1) {
      val = attentionTarget;
    } else {
      val = getRandomNum(attentionMaxItem + 1);
      while (val === attentionTarget) {
        val = getRandomNum(attentionMaxItem + 1);
      }
    }
    $attention.append('<div class="attention-item" data-val="' + val + '" >' + val + '</div>');
  }
  $attention.append('<div class="attention-span"><button id="attention-finish" type="button" class="el-button el-button--primary"><span>我做完啦!</span></button></div>');
  $attention.show();
}

/**
 * 根据对错展示对应的游戏继续提示
 * @param bol 对错
 */
function showAlert(bol) {
  if (bol) {
    return elementAlert('答对啦！', '点击确定或按下空格键来继续游戏吧~');
  } else {
    return elementAlert('答错啦...', '点击确定或按下空格键来继续游戏吧~');
  }
}

/**
 * 计算反应延迟
 * 如果实验开始则记录时间，实验结束则返回反应延迟
 * @param isStart 是否是记录开始时间
 */
function calTestTime(isStart) {
  let cur = new Date();
  if (isStart) {
    timeRecord = cur;
  } else {
    return cur - timeRecord;
  }
}

/**
 * 获得随机数
 * @param max 随机数最大值
 * @returns {number}
 */
function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}

/**
 * element ui 弹框提示（带蒙层，点击确定或空格键关闭提示框）
 * @param title   提示标题
 * @param content 提示内容
 */
function elementAlert(title, content) {
  return new Promise((resolve => {
    $alertMessage.find('.el-message-box__title span').text(title);
    $alertMessage.find('.el-message-box__message p').text(content);
    $alertMessage.find('.el-button--primary').off('click').on('click', function () {
      $alertMessage.hide();
      resolve();
    })
    $(document).on('keydown', function (e) {
      if (e.key === ' ') {
        $alertMessage.hide();
        resolve();
      }
    });
    $alertMessage.show();
  }))
}