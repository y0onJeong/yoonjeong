CSS의 box-model에서 '바깥 여백'과 '안쪽 여백'을 설정하는 속성(property)은 각각 무엇인지 순서대로 쓰시오. 
-> 바깥 여백: margin, 안쪽 여백: padding

수업에서 코드 관리, 버전 관리 및 과제 제출을 위해 사용을 강조한 플랫폼의 이름은 무엇인지 쓰시오. 
-> GitHub

JavaScript에서 id를 이용하여 특정 HTML 요소를 선택할 때 사용하는 함수는 무엇인지 쓰시오.
-> document.getElementById()

CSS에서 너비(width)와 높이(height)가 100px인 정사각형 요소를 완전한 원으로 만들기 위해 사용해야 하는 속성(property)과 값(value)은 무엇인지 쓰시오. 
-> 속성: border-radius 값: 50%

HTML <input> 요소에 type="range" 속성을 사용하여 만들 수 있는 컨트롤의 이름은 무엇인지 한글로 쓰시오.
-> 슬라이더

강의 자료 1강에서는 GitHub를 '강호(江湖)'에 비유하며 그 중요성을 강조했습니다. 이 수업에서 GitHub가 왜 중요한지 서술하고, GitHub Pages를 이용하여 자신의 웹 페이지를 인터넷에 배포하는 과정을 설명하시오. 
-> GitHub는 단순한 저장소가 아니라, 코드 관리, 버전 관리, 협업, 포트폴리오 관리 등 개발자에게 필수적인 기능을 제공하기 때문에 중요합니다.
배포과정
깃허브 계정 생성을 하고 새 저장소를 만들어줍니다. 저장소 이름은 <사용자명>.github.io 형식으로 설정하면 사용자 페이지로 바로 연결됩니다. 그 다음 웹 페이지에 필요한 파일을 준비합니다. 예를 들면 HTML 같은 파일을 말합니다. 다음으로 깃허브웹에서 직접 업로드를 하거나 로컬 PC에서 Git을 이용하여 커밋 후 푸시를 합니다. 다음 깃허브 페이지 설정을 해줍니다. 저장소의 Settings를 들어가 pages 메뉴로 이동합니다. 브랜치(main 또는 master)을 선택하고 저장하면 배포가 시작됩니다. 웹페이지 접속은 설정 후 몇 분 정도 지나면 https://<사용자명>.github.io/ 주소로 자신의 웹 페이지에 접속할 수 있습니다.


CSS의 margin과 padding 속성의 차이점을 설명하고, 언제 각각을 사용해야 하는지 강의 자료의 예시를 바탕으로 설명하시오. 
margin은 요소 바깥이며 용도는 요소 간 간격 조정이고
padding은 요소 안이며 요소 내부 내용과 테두리 사이공간확보를 합니다.
강의 자료 예시처럼 margin은 요소끼리 떨어뜨리고 padding은 내용과 경계 사이 공간을 확보할 때 사용하면 됩니다


강의자료 2강의 '라디오 버튼' 예제 코드를 보고, JavaScript 코드 document.querySelector('input[name="fruit"]:checked').value가 어떻게 여러 개의 라디오 버튼 중 선택된 하나의 값만을 가져올 수 있는지 그 원리를 단계별로 서술하시오. 
type="radio"와 같은 name을 가진 라디오들은 브라우저가 한 그룹당 하나만 선택되도록 다루고, :checked 가 현재 선택된(checked) 라디오를 필터링하고, querySelector는 그 필터에 맞는(문서에서 처음 만나는) 요소를 반환하며, .value는 그 요소의 value 속성 값을 줍니다.
1. HTML에서 type="radio" + name으로 그룹화
<input type="radio" name="group-1" value="사과" checked>
<input type="radio" name="group-1" value="바나나">
같은 name 값(group-1)을 가진 모든 input[type=radio]는 하나의 그룹으로 취급됩니다.
브라우저는 사용자 인터랙션(클릭 등)을 통해 같은 그룹에서 한 항목만 checked 상태가 되도록 다룹니다.
2. :checked 가 현재 체크된 요소만 걸러냄
CSS/Selectors 레벨의 :checked는 해당 요소가 checked 상태일 때 매칭됩니다.
따라서 "input[name=group-1]:checked"는 **group-1 안에서 현재 체크된 라디오(들)**만을 선택 후보로 합니다.
일반 상황에서는 그룹마다 오직 하나만 체크되므로 후보는 보통 1개입니다.
3. document.querySelector(...)는 첫 번째 매칭 요소를 반환
querySelector는 문서에서 조건과 일치하는 첫 번째 요소를 반환합니다.
만약 일치하는 요소가 없으면 null을 반환합니다.
(그룹에 1개만 checked 이므로 그 요소가 곧 반환됩니다.)
4. .value로 그 요소의 값(value) 문자열을 읽음
반환된 요소는 HTMLInputElement이고, .value 프로퍼티는 value="..."에 적힌 문자열을 줍니다.
따라서 ...:checked).value = 현재 선택된 라디오의 값(예: "사과")입니다.
5. 버튼 클릭 시점에 평가되므로 '현재 상태'를 읽음
예제처럼 버튼 클릭 핸들러 내부에서 위 선택자를 사용하면, 버튼을 누른 순간의 체크 상태를 읽습니다.

HTML <input> 태그에 사용자가 입력한 값을 JavaScript로 가져올 때 사용하는 속성(property)은 무엇인지 쓰시오. 
사용자가 <input> 태그에 입력한 값을 JavaScript로 가져올 때 사용하는 속성(property)은 .value입니다.

CSS 스타일을 HTML 문서 내부에 직접 작성하기 위해 사용하는 태그의 이름은 무엇이며, 이 태그는 일반적으로 HTML 문서의 <head>와 <body> 중 어디에 위치하는지 순서대로 쓰시오.
CSS 스타일을 HTML 문서 내부에 직접 작성할 때 사용하는 태그 이름은 <style>입니다.
이 태그는 일반적으로 HTML 문서의 <head> 안에 위치합니다.

사용자가 웹 페이지의 버튼을 클릭했을 때, 특정 텍스트 입력창 (<input type="text">)에 입력된 값을 가져와 화면에 표시하는 전체 과정을 단계별로 설명하시오. 반드시 document.getElementById(), addEventListener(), .value, .textContent 키워드를 모두 사용하여 서술하시오.
먼저 HTML요소를 준비해주세요. 웹 페이지에 텍스트 입력창과 버튼, 그리고 결과를 표시할 요소를 만듭니다. <input type="text" id="inp-text" placeholder="여기에 입력하세요">
<button id="btn-show">확인</button>
<div id="display"></div>를 작성해줍니다. 다음으로 document.getElementById()를 사용하여HTML 요소를 변수에 저장합니다. var inpText = document.getElementById("inp-text");  var btnShow = document.getElementById("btn-show");   
var display = document.getElementById("display"); 그 다음으로는 addventListener()를 사용하여 버튼을 클릭 시 실행할 수 있는 함수를 연결합니다. 
btnShow.addEventListener("click", function() { });
다음으로는 콜백 함수 안에서 입력창에 사용자가 입력한 값을 .value로 가져옵니다. var inputValue = inpText.value;
그 다음으로는 가져온 값을 display 영역에 .textContent로 출력합니다. display.textContent = inputValue; 이 순서대로 하면 버튼을 클릭했을 박스에 입력한 값이 화면에 나타납니다.

실습 문제
카운터 문제
day3
계산기 문제
DAY03
열차표 예약 문제
DAY05 index2