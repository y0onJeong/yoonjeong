// index.js

// 1. 상품 데이터
const products = [
    { 
        id: 101, 
        name: "시그니처 울 코트", 
        category: "outer", 
        price: 129000, 
        image: "img/coat.jpg", 
        description: "고급 울 90% 혼방 소재를 사용하여 보온성이 뛰어난 시그니처 롱 코트입니다. 클래식한 디자인으로 매년 꺼내 입기 좋습니다.", 
        details: "색상: 블랙, 네이비 | 사이즈: S, M, L | 소재: 울 90%, 나일론 10%",
        options: {
            colors: ["블랙", "네이비"],
            sizes: ["S", "M", "L"]
        } 
    },
    { 
        id: 102, 
        name: "오버핏 맨투맨 티셔츠", 
        category: "top", 
        price: 35000, 
        image: "img/mtm.png", 
        description: "루즈한 핏으로 편안하게 착용할 수 있는 기모 안감 맨투맨 티셔츠입니다. 다양한 하의와 매치하기 쉬운 기본 아이템.", 
        details: "색상: 화이트, 그레이, 블랙 | 사이즈: Free | 소재: 면 100% (기모)",
        options: {
            colors: ["화이트", "그레이", "블랙"],
            sizes: ["Free"]
        }
    },
    { 
        id: 103, 
        name: "와이드 핏 데님 팬츠", 
        category: "bottom", 
        price: 49000, 
        image: "img/pt.jpg", 
        description: "트렌디한 와이드 핏으로 다리가 길어 보이는 효과를 주며, 사계절 착용 가능한 탄탄한 데님 소재입니다.", 
        details: "색상: 연청, 중청, 진청 | 사이즈: 26~32 | 소재: 데님",
        options: {
            colors: ["연청", "중청", "진청"],
            sizes: ["26", "28", "30", "32"]
        }
    },
    { id: 104, name: "가을 니트 가디건", category: "outer", price: 78000, image: "img/gd.jpg", 
        description: "부드러운 촉감의 니트 가디건입니다. 간절기에 가볍게 걸치거나, 겨울에 이너로 활용하기 좋습니다.", details: "색상: 베이지, 브라운 | 사이즈: S, M | 소재: 아크릴 80%, 폴리에스터 20%", options: { colors: ["베이지", "브라운"], sizes: ["S", "M"] } },
    { id: 105, name: "베이직 무지 티셔츠", category: "top", price: 19000, image: "img/mz.jpg", description: "매일 입기 좋은 기본 중의 기본 무지 티셔츠입니다. 여러 장 구매하여 돌려 입기 좋은 가성비 아이템.", details: 
        "색상: 화이트, 블랙 | 사이즈: FREE | 소재: 면 100%", options: { colors: ["화이트", "블랙"], sizes: ["FREE"] } },
];


// 2. DOM 요소 및 상태 변수 (변동 없음)
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
const modalTitle = document.getElementById('modal-title'); 
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username'); 

// 회원가입 관련 요소
const signupForm = document.getElementById('signup-form');
const switchToSignupLink = document.getElementById('switch-to-signup');
const switchToLoginLink = document.getElementById('switch-to-login');

// 장바구니 관련 요소
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal'); 
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


// 3. 유틸리티 함수

/** 로그인 상태 확인 및 버튼 UI 업데이트 (변동 없음) */
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
function handleLogout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.removeItem('loggedInUser');
    checkLoginStatus(); 
    loginModal.style.display = 'none';
    alert('로그아웃되었습니다.');
}

// ⭐ [핵심 변경] createProductCard: 옵션 유무에 따라 동작 분기
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

    // 상품 카드 클릭 시 상세 모달 열기
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            showProductDetail(product.id);
        }
    });

    // 카드 내 '장바구니 담기' 버튼 클릭 시 (옵션 유무 분기)
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const hasOptions = product.options && 
            (product.options.colors.length > 0 || product.options.sizes.length > 0);

        if (hasOptions) {
            // 옵션이 있다면 상세 모달로 이동 유도 (색상/사이즈 선택 강제)
            alert('옵션(색상/사이즈) 선택을 위해 상세 페이지로 이동합니다.');
            showProductDetail(product.id);
        } else {
            // 옵션이 없다면 바로 추가 (옵션 값은 기본값으로 전달)
            addToCart(product.id, 'N/A', 'N/A'); 
        }
    });

    return card;
}
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
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}
function updateCartDisplay() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

// ⭐ [핵심 변경] addToCart: color, size 매개변수 추가 및 장바구니 로직 수정
function addToCart(productId, color = 'N/A', size = 'N/A') {
    const productToAdd = products.find(p => p.id === productId);
    
    // 동일한 상품 ID, 색상, 사이즈를 가진 아이템을 찾습니다.
    const existingItem = cart.find(item => 
        item.id === productId &&
        item.color === color &&
        item.size === size
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: productToAdd.id, 
            name: productToAdd.name, 
            price: productToAdd.price, 
            quantity: 1,
            color: color, 
            size: size    
        });
    }

    updateLocalStorage();
    updateCartDisplay();
    alert(`${productToAdd.name} (${color}, ${size})이(가) 장바구니에 담겼습니다.`);
}

// ⭐ [핵심 변경] removeFromCart: color, size 매개변수 추가하여 특정 옵션 상품만 삭제
function removeFromCart(productId, color, size) {
    // ID, 색상, 사이즈가 모두 일치하는 아이템만 제외하고 필터링합니다.
    cart = cart.filter(item => !(item.id === productId && item.color === color && item.size === size));
    
    updateLocalStorage();
    updateCartDisplay();
    renderCartModal();
}

// ⭐ [핵심 변경] renderCartModal: 옵션 정보 표시 및 삭제 버튼에 옵션 데이터 추가
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
            
            // 상품 이름 옆에 옵션 정보 추가
            const optionText = item.color !== 'N/A' || item.size !== 'N/A' 
                ? ` (${item.color} / ${item.size})` 
                : ''; 
                
            cartItemEl.innerHTML = `
                <p>${item.name}${optionText}</p>
                <p>${item.price.toLocaleString()}원 x ${item.quantity}</p>
                <p>합계: ${itemTotal.toLocaleString()}원</p>
                <button class="remove-btn" data-id="${item.id}" data-color="${item.color}" data-size="${item.size}">삭제</button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }
    
    cartTotalElement.textContent = total.toLocaleString('ko-KR');
    
    // 장바구니 삭제 로직: ID, 색상, 사이즈를 모두 기준으로 삭제
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const idToRemove = parseInt(this.getAttribute('data-id'));
            const colorToRemove = this.getAttribute('data-color');
            const sizeToRemove = this.getAttribute('data-size');
            removeFromCart(idToRemove, colorToRemove, sizeToRemove);
        });
    });
}

// ⭐ [핵심 변경] showProductDetail: 옵션 선택 UI 추가 및 addToCart 호출 시 옵션 전달
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('상품을 찾을 수 없습니다.');
        return;
    }

    // 옵션 선택 UI를 위한 HTML 생성
    let colorOptionsHTML = product.options.colors.map(color => 
        `<option value="${color}">${color}</option>`
    ).join('');
    
    let sizeOptionsHTML = product.options.sizes.map(size => 
        `<option value="${size}">${size}</option>`
    ).join('');
    
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
                
                <div class="product-options">
                    <div class="option-group">
                        <label for="detail-color-select">색상:</label>
                        <select id="detail-color-select">${colorOptionsHTML}</select>
                    </div>
                    <div class="option-group">
                        <label for="detail-size-select">사이즈:</label>
                        <select id="detail-size-select">${sizeOptionsHTML}</select>
                    </div>
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
        // 선택된 옵션을 가져와서 전달
        const selectedColor = document.getElementById('detail-color-select').value;
        const selectedSize = document.getElementById('detail-size-select').value;
        addToCart(product.id, selectedColor, selectedSize); 
        productDetailModal.style.display = 'none';
    });
    
    productDetailModal.style.display = 'block';
}


// 4. 로그인/회원가입 폼 전환 로직 (변동 없음)

/** 로그인 폼 표시 */
function showLoginForm() {
    modalTitle.textContent = '👤 로그인';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    switchToSignupLink.style.display = 'block';
    switchToLoginLink.style.display = 'none';
}

/** 회원가입 폼 표시 */
function showSignupForm() {
    modalTitle.textContent = '✨ 회원가입';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    switchToSignupLink.style.display = 'none';
    switchToLoginLink.style.display = 'block';
}


// 5. 이벤트 리스너 설정 (변동 없음)

// 로그인/로그아웃 버튼 클릭
loginButton.addEventListener('click', () => {
    if (isLoggedIn) {
        handleLogout();
    } else {
        showLoginForm(); 
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

// 회원가입 폼 전환 이벤트
switchToSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSignupForm();
});

// 로그인 폼 전환 이벤트
switchToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

// 회원가입 폼 제출 이벤트
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newUsername = document.getElementById('signup-username').value.trim();
    const newPassword = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-password-confirm').value;

    if (newPassword !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // 모의 회원가입 완료
    alert(`🎉 ${newUsername}님, 회원가입이 완료되었습니다! 로그인해 주세요.`);
    
    // 가입 후 로그인 폼으로 전환 및 아이디 자동 입력
    showLoginForm(); 
    signupForm.reset();
    document.getElementById('username').value = newUsername; 
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

// 장바구니 열기 이벤트 리스너
cartButton.addEventListener('click', () => {
    renderCartModal();
    cartModal.style.display = 'block';
});

// 모달 닫기
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


// 6. 페이지 로드 시 초기 실행 (변동 없음)
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); 
    heroSection.style.display = 'flex'; 
    renderProducts('all');
    handleScrollHeader();
    updateCartDisplay();
});