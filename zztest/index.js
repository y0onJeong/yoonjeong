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
        "색상: 5가지 | 사이즈: S, M, L, XL | 소재: 면 100%", options: { colors: ["화이트", "블랙"], sizes: ["FREE"] } },
];

// 2. DOM 요소 및 상태 변수
const productListSection = document.getElementById('product-list');
const navLinks = document.querySelectorAll('.nav-link[data-category]');
const header = document.getElementById('main-header');
const heroSection = document.getElementById('hero-section'); 
const mainLogo = document.querySelector('#main-header h1'); 

// Local Storage에서 상태 로드
let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
// 장바구니 항목은 이제 uniqueId와 옵션을 포함합니다.
let cart = JSON.parse(localStorage.getItem('cartItems')) || []; 

const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username'); 

const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal'); 
const cartCloseButton = document.querySelector('.cart-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');

const couponModal = document.getElementById('coupon-modal');
const couponCheckButton = document.getElementById('coupon-check-btn');
const productDetailModal = document.getElementById('product-detail-modal');
const detailCloseButton = document.querySelector('.detail-close');
const productDetailInfo = document.getElementById('product-detail-info');


// --- 핵심 기능 함수 ---

/** 1. 로그인 상태 확인 및 버튼 UI 업데이트 */
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

/** 2. 로그아웃 처리 */
function handleLogout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.removeItem('loggedInUser');
    checkLoginStatus(); 
    loginModal.style.display = 'none';
    alert('로그아웃되었습니다.');
}

/** 3. 상품 카드 생성 */
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

    // 카드 내 '장바구니 담기' 버튼 클릭 시
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // 상품 카드에서 바로 담을 경우, 옵션이 있다면 상세 모달로 이동 유도
        if (product.options) {
             alert('옵션(색상/사이즈) 선택을 위해 상세 페이지로 이동합니다.');
             showProductDetail(product.id);
        } else {
             // 옵션이 없다면 바로 추가
             addToCart(product.id, null, null); 
        }
    });

    return card;
}

/** 4. 상품 목록 렌더링 */
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

/** 5. 장바구니 Local Storage 업데이트 */
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

/** 6. 장바구니 카운트 업데이트 */
function updateCartDisplay() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

/** 7. 장바구니에 상품 추가 (옵션 포함) */
function addToCart(productId, selectedColor, selectedSize) {
    const productToAdd = products.find(p => p.id === productId);
    
    // 장바구니 항목을 고유하게 식별할 ID (상품 ID + 선택 옵션)
    const uniqueItemId = `${productId}-${selectedColor || 'NoColor'}-${selectedSize || 'NoSize'}`;

    // 장바구니 내에 이미 같은 옵션의 상품이 있는지 확인
    const existingItem = cart.find(item => item.uniqueId === uniqueItemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: productToAdd.id, 
            uniqueId: uniqueItemId, // 고유 옵션을 포함한 ID
            name: productToAdd.name, 
            price: productToAdd.price, 
            quantity: 1,
            // 옵션 정보 저장
            color: selectedColor,
            size: selectedSize
        });
    }
    
    updateLocalStorage();
    updateCartDisplay();
    
    let alertMessage = `${productToAdd.name}`;
    if (selectedColor || selectedSize) {
        alertMessage += ` (${selectedColor || '옵션없음'} / ${selectedSize || '옵션없음'})`;
    }
    alert(alertMessage + '이(가) 장바구니에 담겼습니다.');
}

/** 8. 장바구니에서 상품 제거 (Unique ID 기반) */
function removeFromCart(uniqueItemId) {
    // uniqueId가 일치하지 않는 항목들만 필터링하여 남깁니다.
    cart = cart.filter(item => item.uniqueId !== uniqueItemId); 
    
    updateLocalStorage();
    updateCartDisplay();
    renderCartModal();
}

/** 9. 장바구니 모달 내용 렌더링 */
function renderCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>장바구니가 비어있습니다.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            // 선택된 옵션 표시 (null일 경우 표시하지 않음)
            let optionsText = '';
            if (item.color) optionsText += `색상: ${item.color}`;
            if (item.size) optionsText += (optionsText ? ' / ' : '') + `사이즈: ${item.size}`;
            
            // 옵션이 없는 상품도 대비하여 최종 검토
            if (!optionsText && (item.color || item.size)) {
                optionsText = `옵션 없음`;
            }
            
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-options">${optionsText}</p>
                </div>
                <div class="cart-item-price-actions">
                    <p>${item.price.toLocaleString()}원 x ${item.quantity}</p>
                    <p>합계: ${itemTotal.toLocaleString()}원</p>
                    <button class="remove-btn" data-unique-id="${item.uniqueId}">삭제</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }
    
    cartTotalElement.textContent = total.toLocaleString('ko-KR');
    
    // 삭제 버튼 이벤트 리스너 재부착 (uniqueId 사용)
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const uniqueIdToRemove = this.getAttribute('data-unique-id');
            removeFromCart(uniqueIdToRemove);
        });
    });
}

/** 10. 상품 상세 모달 표시 (옵션 선택 필드 포함) */
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert('상품을 찾을 수 없습니다.');
        return;
    }

    // 옵션 선택 필드 생성 로직
    let optionsHtml = '';
    
    // 1. 색상 옵션
    if (product.options && product.options.colors) {
        optionsHtml += `
            <div class="option-group">
                <label for="color-select">색상 선택:</label>
                <select id="color-select" required>
                    <option value="" disabled selected>-- 색상 선택 --</option>
                    ${product.options.colors.map(color => 
                        `<option value="${color}">${color}</option>`
                    ).join('')}
                </select>
            </div>
        `;
    }

    // 2. 사이즈 옵션
    if (product.options && product.options.sizes) {
        optionsHtml += `
            <div class="option-group">
                <label for="size-select">사이즈 선택:</label>
                <select id="size-select" required>
                    <option value="" disabled selected>-- 사이즈 선택 --</option>
                    ${product.options.sizes.map(size => 
                        `<option value="${size}">${size}</option>`
                    ).join('')}
                </select>
            </div>
        `;
    }
    
    productDetailInfo.innerHTML = `
        <div class="detail-container">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-text-info">
                <h3>${product.name}</h3>
                <p class="detail-price">${product.price.toLocaleString('ko-KR')}원</p>

                ${optionsHtml} 
                
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

    // 상세 모달 내 '장바구니에 담기' 버튼 이벤트 리스너
    const detailAddToCartBtn = productDetailInfo.querySelector('.add-to-cart-btn');
    detailAddToCartBtn.addEventListener('click', () => {
        const colorSelect = document.getElementById('color-select');
        const sizeSelect = document.getElementById('size-select');
        
        const selectedColor = colorSelect ? colorSelect.value : null;
        const selectedSize = sizeSelect ? sizeSelect.value : null;
        
        // 옵션 선택 필수 검증
        if (product.options && product.options.colors && (!selectedColor || selectedColor === '')) {
            alert('색상을 선택해주세요.');
            return;
        }
        if (product.options && product.options.sizes && (!selectedSize || selectedSize === '')) {
            alert('사이즈를 선택해주세요.');
            return;
        }

        // 옵션을 포함하여 addToCart 함수 호출
        addToCart(product.id, selectedColor, selectedSize); 
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


// 메인 로고 클릭
mainLogo.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-link[data-category="all"]').classList.add('active');
    
    heroSection.style.display = 'flex';
    renderProducts('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// 카테고리 클릭
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

// 장바구니 열기
cartButton.addEventListener('click', () => {
    renderCartModal();
    cartModal.style.display = 'block'; 
});

// 모달 닫기 버튼들 및 외부 클릭 이벤트
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


// 11. 페이지 로드 시 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); 
    heroSection.style.display = 'flex'; 
    renderProducts('all');
    handleScrollHeader();
    updateCartDisplay();
});

// ** ======================================================= **
// ** ✨ 회원가입 기능 추가: 폼 전환 로직 **
// ** ======================================================= **

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

// --- 이벤트 리스너 ---

// 로그인/로그아웃 버튼 클릭
loginButton.addEventListener('click', () => {
    if (isLoggedIn) {
        handleLogout();
    } else {
        showLoginForm(); // 로그인 모달을 열 때 로그인 폼을 먼저 보여줍니다.
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

// ✨ 회원가입 폼 전환 이벤트
switchToSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSignupForm();
});

// ✨ 로그인 폼 전환 이벤트
switchToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

// ✨ 회원가입 폼 제출 이벤트
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
