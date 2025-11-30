// script.js

// 1. 상품 데이터
const products = [
    { id: 101, name: "시그니처 울 코트", category: "outer", price: 129000, image: "https://via.placeholder.com/250x300?text=Outer+Coat", description: "고급 울 90% 혼방 소재를 사용하여 보온성이 뛰어난 시그니처 롱 코트입니다. 클래식한 디자인으로 매년 꺼내 입기 좋습니다.", details: "색상: 블랙, 네이비 | 사이즈: S, M, L | 소재: 울 90%, 나일론 10%" },
    { id: 102, name: "오버핏 맨투맨 티셔츠", category: "top", price: 35000, image: "https://via.placeholder.com/250x300?text=Top+Tshirt", description: "루즈한 핏으로 편안하게 착용할 수 있는 기모 안감 맨투맨 티셔츠입니다. 다양한 하의와 매치하기 쉬운 기본 아이템.", details: "색상: 화이트, 그레이, 블랙 | 사이즈: Free | 소재: 면 100% (기모)" },
    { id: 103, name: "와이드 핏 데님 팬츠", category: "bottom", price: 49000, image: "https://via.placeholder.com/250x300?text=Bottom+Jeans", description: "트렌디한 와이드 핏으로 다리가 길어 보이는 효과를 주며, 사계절 착용 가능한 탄탄한 데님 소재입니다.", details: "색상: 연청, 중청, 진청 | 사이즈: 26~32 | 소재: 데님" },
    { id: 104, name: "가을 니트 가디건", category: "outer", price: 78000, image: "https://via.placeholder.com/250x300?text=Outer+Knit", description: "부드러운 촉감의 니트 가디건입니다. 간절기에 가볍게 걸치거나, 겨울에 이너로 활용하기 좋습니다.", details: "색상: 베이지, 브라운 | 사이즈: S, M | 소재: 아크릴 80%, 폴리에스터 20%" },
    { id: 105, name: "베이직 무지 티셔츠", category: "top", price: 19000, image: "https://via.placeholder.com/250x300?text=Top+Basic", description: "매일 입기 좋은 기본 중의 기본 무지 티셔츠입니다. 여러 장 구매하여 돌려 입기 좋은 가성비 아이템.", details: "색상: 5가지 | 사이즈: S, M, L, XL | 소재: 면 100%" },
];

// 2. DOM 요소 및 상태 변수
const productListSection = document.getElementById('product-list');
const navLinks = document.querySelectorAll('.nav-link[data-category]');
const header = document.getElementById('main-header');
const heroSection = document.getElementById('hero-section'); 
const mainLogo = document.querySelector('#main-header h1'); 

// 로그인 및 장바구니 상태
let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username'); 
const cartButton = document.getElementById('cart-button');
const cartCloseButton = document.querySelector('.cart-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const couponModal = document.getElementById('coupon-modal');
const couponCheckButton = document.getElementById('coupon-check-btn');
const couponCloseButton = document.querySelector('.coupon-close');
const productDetailModal = document.getElementById('product-detail-modal');
const detailCloseButton = document.querySelector('.detail-close');
const productDetailInfo = document.getElementById('product-detail-info');


// --- 핵심 기능 함수 ---

/** 로그인 상태 확인 및 버튼 UI 업데이트 */
function checkLoginStatus() {
    if (isLoggedIn) {
        const username = localStorage.getItem('loggedInUser') || '회원';
        loginButton.innerHTML = `👋 ${username} (로그아웃)`;
        loginButton.classList.add('logged-in');
    } else {
        loginButton.innerHTML = '👤 로그인';
        loginButton.classList.remove('logged-in');
    }
}

/** 로그아웃 처리 */
function handleLogout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.removeItem('loggedInUser');
    checkLoginStatus(); 
    loginModal.style.display = 'none';
    alert('로그아웃되었습니다.');
}

/** 상품 카드 생성 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.setAttribute('data-product-id', product.id);
    const formattedPrice = product.price.toLocaleString('ko-KR'); 

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="card-info">
            <p class="name">${product.name}</p>
            <p class="price">${formattedPrice}원</p>
        </div>
        <button class="add-to-cart-btn" data-product-id="${product.id}">장바구니 담기</button>
    `;

    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            showProductDetail(product.id);
        }
    });

    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });

    return card;
}

/** 상품 목록 렌더링 */
function renderProducts(filterCategory) {
    productListSection.innerHTML = ''; 
    
    const filteredProducts = products.filter(product => 
        filterCategory === 'all' || product.category === filterCategory
    );

    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productListSection.appendChild(card);
    });
}

/** 장바구니 Local Storage 업데이트 */
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

/** 장바구니 카운트 업데이트 */
function updateCartDisplay() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

/** 장바구니에 상품 추가 */
function addToCart(productId) {
    const productToAdd = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: productToAdd.id, 
            name: productToAdd.name, 
            price: productToAdd.price, 
            quantity: 1 
        });
    }
    
    updateLocalStorage();
    updateCartDisplay();
    alert(`${productToAdd.name}이(가) 장바구니에 담겼습니다.`);
}

/** 장바구니에서 상품 제거 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateLocalStorage();
    updateCartDisplay();
    renderCartModal();
}

/** 장바구니 모달 내용 렌더링 */
function renderCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>장바구니가 비어있습니다.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <p>${item.name}</p>
                <p>${item.price.toLocaleString()}원 x ${item.quantity}</p>
                <p>합계: ${itemTotal.toLocaleString()}원</p>
                <button class="remove-btn" data-id="${item.id}">삭제</button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }
    
    cartTotalElement.textContent = total.toLocaleString('ko-KR');
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const idToRemove = parseInt(this.getAttribute('data-id'));
            removeFromCart(idToRemove);
        });
    });
}

/** 상품 상세 모달 표시 */
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert('상품을 찾을 수 없습니다.');
        return;
    }

    productDetailInfo.innerHTML = `
        <div class="detail-container">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-text-info">
                <h3>${product.name}</h3>
                <p class="detail-price">${product.price.toLocaleString('ko-KR')}원</p>
                
                <div class="detail-description-box">
                    <h4>📝 상품 설명</h4>
                    <p>${product.description}</p>
                </div>

                <div class="detail-spec-box">
                    <h4>🔍 상세 정보</h4>
                    <p>${product.details}</p>
                </div>
                
                <button class="add-to-cart-btn large-btn" data-product-id="${product.id}">
                    🛒 장바구니에 담기
                </button>
            </div>
        </div>
    `;

    const detailAddToCartBtn = productDetailInfo.querySelector('.add-to-cart-btn');
    detailAddToCartBtn.addEventListener('click', () => {
        addToCart(product.id);
        productDetailModal.style.display = 'none';
    });

    productDetailModal.style.display = 'block';
}


// --- 이벤트 리스너 ---

// 로그인/로그아웃 버튼 클릭
loginButton.addEventListener('click', () => {
    if (isLoggedIn) {
        handleLogout();
    } else {
        loginModal.style.display = 'block';
    }
});

// 로그인 폼 제출
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim() || '회원'; 

    isLoggedIn = true;
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('loggedInUser', username);

    checkLoginStatus(); 
    
    alert(`${username}님, 환영합니다! (로그인 성공)`);
    loginModal.style.display = 'none';
    loginForm.reset();
});


// 메인 로고 클릭 (BEST 상품 목록 + Hero Section 표시)
mainLogo.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-link[data-category="all"]').classList.add('active');
    
    heroSection.style.display = 'flex';
    renderProducts('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// 카테고리 클릭 (필터링 및 Hero Section 표시/숨김)
function handleCategoryClick(e) {
    e.preventDefault();
    
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    const category = this.getAttribute('data-category');
    
    if (category === 'all') {
        heroSection.style.display = 'flex';
    } else {
        heroSection.style.display = 'none';
    }

    renderProducts(category || 'all');
}
navLinks.forEach(link => {
    link.addEventListener('click', handleCategoryClick);
});

// 스크롤 이벤트 (헤더 고정 및 색상 변경)
function handleScrollHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', handleScrollHeader);

// 장바구니, 쿠폰, 상품 상세 모달 열기/닫기
cartButton.addEventListener('click', () => {
    renderCartModal();
    cartModal.style.display = 'block';
});
cartCloseButton.addEventListener('click', () => { cartModal.style.display = 'none'; });
document.querySelector('.login-close').addEventListener('click', () => { loginModal.style.display = 'none'; });
couponCheckButton.addEventListener('click', (e) => {
    e.preventDefault();
    couponModal.style.display = 'block';
});
document.querySelector('.coupon-close').addEventListener('click', () => { couponModal.style.display = 'none'; });
detailCloseButton.addEventListener('click', () => { productDetailModal.style.display = 'none'; });

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === cartModal) { cartModal.style.display = 'none'; } 
    else if (e.target === loginModal) { loginModal.style.display = 'none'; } 
    else if (e.target === couponModal) { couponModal.style.display = 'none'; } 
    else if (e.target === productDetailModal) { productDetailModal.style.display = 'none'; }
});


// 6. 페이지 로드 시 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); 
    heroSection.style.display = 'flex'; 
    renderProducts('all');
    handleScrollHeader();
    updateCartDisplay();
});