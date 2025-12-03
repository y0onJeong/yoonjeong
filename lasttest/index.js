const products = [
    { 
        id: 101, 
        name: "시그니처 울 코트", 
        category: "outer", 
        price: 129000, 
        image: "img/coat.png", 
        description: "고급 울 90% 혼방 소재를 사용하여 보온성이 뛰어난 시그니처 롱 코트입니다.", 
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
        description: "루즈한 핏으로 편안하게 착용할 수 있는 기모 안감 맨투맨 티셔츠입니다.", 
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
        description: "트렌디한 와이드 핏으로 다리가 길어 보이는 효과를 주며, 사계절 착용 가능합니다.", 
        details: "색상: 연청, 중청, 진청 | 사이즈: 26~32 | 소재: 데님",
        options: {
            colors: ["연청", "중청", "진청"],
            sizes: ["26", "28", "30", "32"]
        }
    },
    { 
        id: 104, 
        name: "가을 니트 가디건", 
        category: "outer", 
        price: 78000, 
        image: "img/gd.jpg", 
        description: "부드러운 촉감의 니트 가디건입니다. 간절기에 가볍게 걸치거나, 겨울에 이너로 활용하기 좋습니다.", 
        details: "색상: 베이지, 브라운 | 사이즈: S, M | 소재: 아크릴 80%, 폴리에스터 20%", 
        options: { 
            colors: ["베이지", "브라운"], 
            sizes: ["S", "M"] 
        } 
    },
    { 
        id: 105, 
        name: "베이직 무지 반팔 티셔츠", 
        category: "top", 
        price: 19000, 
        image: "img/mz.jpg", 
        description: "매일 입기 좋은 기본 중의 기본 무지 반팔 티셔츠입니다.", 
        details: "색상: 화이트, 블랙 | 사이즈: FREE | 소재: 면 100%", 
        options: { 
            colors: ["화이트", "블랙"], 
            sizes: ["FREE"] 
        } 
    },
    { 
        id: 106, 
        name: "데일리 로고 볼캡", 
        category: "acc", 
        price: 25000, 
        image: "img/cap.png", 
        description: "면 100% 소재의 클래식 볼캡입니다. 미니멀한 로고 자수로 포인트를 주었습니다.", 
        details: "색상: 블랙, 화이트, 베이지 | 사이즈: Free | 소재: 면 100%",
        options: {
            colors: ["블랙", "화이트", "베이지"],
            sizes: ["Free"]
        } 
    },
    { 
        id: 201, 
        name: "클래식 트렌치 코트", 
        category: "outer", 
        price: 159000, 
        image: "img/trench.jpg", 
        description: "가을 필수 아이템. 견고한 코튼 소재의 오리지널 트렌치 코트.", 
        details: "색상: 베이지, 카키 | 사이즈: S, M, L | 소재: 면 100%", 
        options: { 
            colors: ["베이지", "카키"], 
            sizes: ["S", "M", "L"] 
        } 
    },
    { 
        id: 202, 
        name: "경량 패딩 조끼", 
        category: "outer", 
        price: 55000, 
        image: "img/padding.jpg", 
        description: "가벼우면서 보온성이 뛰어난 경량 패딩 조끼입니다. 이너 또는 아우터로 활용 가능.", 
        details: "색상: 블랙, 차콜 | 사이즈: M, L, XL | 소재: 폴리에스터 100%", 
        options: { 
            colors: ["블랙", "차콜"], 
            sizes: ["M", "L", "XL"] 
        } 
    },
    { 
        id : 203, 
        name: "프리미엄 구스 다운 패딩", 
        category: "outer", 
        price: 120000, 
        image: "img/goose_padding.png", 
        description: "최상급 구스 다운 충전재를 사용하여 극한의 추위에도 따뜻함을 유지해주는 프리미엄 롱 패딩입니다. 생활 방수 기능 탑재.", 
        details: "색상: 블랙 | 사이즈: FREE | 소재: 겉감-나일론 100%, 충전재-구스 다운 80%, 깃털 20%", 
        options: { 
            colors: ["블랙"], 
            sizes: ["FREE"] 
        } 
    },
    { 
        id: 301, 
        name: "스트라이프 셔츠", 
        category: "top", 
        price: 39000, 
        image: "img/shirt.jpg", 
        description: "깔끔한 디자인의 클래식 스트라이프 셔츠.", 
        details: "색상: 블루 스트라이프 | 사이즈: 95, 100, 105 | 소재: 면 100%", 
        options: { 
            colors: ["블루 스트라이프"], 
            sizes: ["95", "100", "105"] 
        } 
    },
    { 
        id: 302, 
        name: "캐시미어 블렌드 니트", 
        category: "top", 
        price: 68000, 
        image: "img/knit.jpg", 
        description: "부드러운 캐시미어 혼방으로 고급스러운 촉감을 자랑합니다.", 
        details: "색상: 아이보리, 블루, 브라운 | 사이즈: Free | 소재: 캐시미어, 울 혼방", 
        options: { 
            colors: ["아이보리", "블루", "브라운"], 
            sizes: ["Free"] 
        } 
    },
    { 
        id: 303, 
        name: "베이직 긴팔 티셔츠", 
        category: "top", 
        price: 22000, 
        image: "img/longsleeve.jpg", 
        description: "다양한 색상으로 준비된 활용도 높은 기본 긴팔 티셔츠.", 
        details: "색상: 블랙, 화이트 | 사이즈: FREE | 소재: 면 100%", 
        options: { 
            colors: ["블랙", "화이트"], 
            sizes: ["FREE"] 
        } 
    },
    { 
        id: 401, 
        name: "슬랙스 밴딩 팬츠", 
        category: "bottom", 
        price: 59000, 
        image: "img/slacks.jpg", 
        description: "편안한 밴딩 허리와 깔끔하게 떨어지는 핏의 슬랙스.", 
        details: "색상: 블랙, 네이비 | 사이즈: S, M, L, XL | 소재: 폴리에스터, 레이온", 
        options: { 
            colors: ["블랙", "네이비"], 
            sizes: ["S", "M", "L", "XL"] 
        } 
    },
    { 
        id: 402, 
        name: "빈티지 핀턱 청바지", 
        category: "bottom", 
        price: 65000, 
        image: "img/jeans.jpg", 
        description: "빈티지 워싱이 매력적인 레귤러 핏 일자 청바지.", 
        details: "색상: 빈티지 블루 | 사이즈: 28~34 | 소재: 데님", 
        options: { 
            colors: ["빈티지 블루"], 
            sizes: ["28", "30", "32", "34"] 
        } 
    },
    { 
        id: 403, 
        name: "플리츠 롱 스커트", 
        category: "bottom", 
        price: 45000, 
        image: "img/skirt.jpg", 
        description: "우아한 주름이 돋보이는 롱 기장의 플리츠 스커트.", 
        details: "색상: 블랙, 그레이 | 사이즈: Free | 소재: 폴리에스터 100%", 
        options: { 
            colors: ["블랙", "그레이"], 
            sizes: ["Free"] 
        } 
    },
    { 
        id: 501, 
        name: "심플 숄더백", 
        category: "acc", 
        price: 88000, 
        image: "img/bag.jpg", 
        description: "데일리로 활용하기 좋은 미니멀 디자인의 숄더백.", 
        details: "색상: 블랙, 브라운 | 소재: 인조 가죽", 
        options: { 
            colors: ["블랙", "브라운"], 
            sizes: ["Free"] 
        } 
    },
    { 
        id: 502, 
        name: "실버 체인 목걸이", 
        category: "acc", 
        price: 32000, 
        image: "img/necklace.jpg", 
        description: "단독으로 착용하거나 레이어드하기 좋은 심플한 실버 목걸이.", 
        details: "색상: 실버 | 소재: Silver 925", 
        options: { 
            colors: ["실버"], 
            sizes: ["Free"] 
        } 
    },
    { 
        id: 503, 
        name: "울 머플러", 
        category: "acc", 
        price: 42000, 
        image: "img/muffler.png", 
        description: "겨울철 필수 아이템. 부드러운 촉감의 울 혼방 머플러.", 
        details: "색상: 레드, 그린, 베이지, 화이트 | 소재: 울 혼방", 
        options: { 
            colors: ["레드", "그린", "베이지", "화이트"], 
            sizes: ["Free"] 
        } 
    },
    { 
        id: 504, 
        name: "데일리 양말 세트 (5켤레)", 
        category: "acc", 
        price: 15000, 
        image: "img/socks.png", 
        description: "다양한 색상으로 구성된 면 소재의 데일리 양말 세트.", 
        details: "색상: 화이트 | 소재: 면, 폴리에스터", 
        options: { 
            colors: ["화이트"], 
            sizes: ["Free"] 
        }
    }
];

const productListSection = document.getElementById('product-list');
const productListContainer = document.getElementById('product-list-container');
const sectionTitle = productListContainer ? productListContainer.querySelector('.section-title') : null; 
const navLinks = document.querySelectorAll('.nav-link[data-category]');
const header = document.getElementById('main-header');
const heroSection = document.getElementById('hero-section'); 
const mainLogo = document.querySelector('#main-header h1'); 
const modalTitle = document.getElementById('modal-title'); 

let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
let cart = JSON.parse(localStorage.getItem('cartItems')) || []; 

const loginButton = document.getElementById('login-button');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form'); 
const usernameInput = document.getElementById('username'); 
const switchToSignupLink = document.getElementById('switch-to-signup'); 
const switchToLoginLink = document.getElementById('switch-to-login'); 

const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal'); 
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');

const couponModal = document.getElementById('coupon-modal');
const couponCheckButton = document.getElementById('coupon-check-btn'); 
const productDetailModal = document.getElementById('product-detail-modal');
const productDetailInfo = document.getElementById('product-detail-info');

const paymentModal = document.getElementById('payment-modal'); 
const deliveryForm = document.getElementById('delivery-form'); 
const loginCheckoutBtn = document.getElementById('login-checkout-btn'); 
const guestCheckoutBtn = document.getElementById('guest-checkout-btn'); 

function checkLoginStatus() {
    if (!loginButton) return;
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
    if (loginModal) loginModal.style.display = 'none';
    alert('로그아웃되었습니다.');
}


function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}


function updateCartDisplay() {
    if (!cartCountElement) return;
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}


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
        if (product.options && (product.options.colors || product.options.sizes)) {
            alert('옵션(색상/사이즈) 선택을 위해 상세 페이지로 이동합니다.');
            showProductDetail(product.id);
        } else {
            addToCart(product.id, null, null, 1); 
        }
    });

    return card;
}


function renderProducts(filterCategory) {
    if (!productListSection) return;

    productListSection.innerHTML = ''; 
    
    
    if (sectionTitle) {
        sectionTitle.style.display = filterCategory === 'all' ? 'block' : 'none';
    }

    const filteredProducts = products.filter(product => 
        filterCategory === 'all' || product.category === filterCategory
    );

    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productListSection.appendChild(card);
    });
}


function addToCart(productId, selectedColor, selectedSize, quantity = 1) { 
    const productToAdd = products.find(p => p.id === productId);
    
    if (!productToAdd) return;

    
    const uniqueItemId = `${productId}-${selectedColor || 'NoColor'}-${selectedSize || 'NoSize'}`;

    const existingItem = cart.find(item => item.uniqueId === uniqueItemId);

    if (existingItem) {
        existingItem.quantity += quantity; 
    } else {
        cart.push({ 
            id: productToAdd.id, 
            uniqueId: uniqueItemId,
            name: productToAdd.name, 
            price: productToAdd.price, 
            quantity: quantity, 
            color: selectedColor,
            size: selectedSize
        });
    }
    
    updateLocalStorage();
    updateCartDisplay();
    
    let alertMessage = `${productToAdd.name} ${quantity}개`;
    if (selectedColor || selectedSize) {
        alertMessage += ` (색상: ${selectedColor || '없음'} / 사이즈: ${selectedSize || '없음'})`;
    }
    alert(alertMessage + '가 장바구니에 담겼습니다.');
}


function removeFromCart(uniqueItemId) {
    cart = cart.filter(item => item.uniqueId !== uniqueItemId); 
    
    updateLocalStorage();
    updateCartDisplay();
    renderCartModal();
}


function renderCartModal() {
    if (!cartItemsContainer || !cartTotalElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>장바구니가 비어있습니다.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            let optionsText = '';
            const colorDisplay = item.color && item.color !== 'NoColor' ? `색상: ${item.color}` : '';
            const sizeDisplay = item.size && item.size !== 'NoSize' ? `사이즈: ${item.size}` : '';

            if (colorDisplay) optionsText += colorDisplay;
            if (sizeDisplay) optionsText += (optionsText ? ' / ' : '') + sizeDisplay;
            
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-options">${optionsText || '옵션 없음'}</p>
                </div>
                <div class="cart-item-price-actions">
                    <p>${item.price.toLocaleString()}원 x ${item.quantity}</p>
                    <button class="remove-btn" data-unique-id="${item.uniqueId}">삭제</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }
    
    cartTotalElement.textContent = total.toLocaleString('ko-KR');
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const uniqueIdToRemove = this.getAttribute('data-unique-id');
            removeFromCart(uniqueIdToRemove);
        });
    });
}


function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);

    if (!product || !productDetailInfo) return;

    
    let optionsHtml = '';
    
    
    if (product.options && product.options.colors && product.options.colors.length > 0) {
        optionsHtml += `
            <div class="option-group">
                <label for="color-select">색상 선택:</label>
                <select id="color-select" required>
                    <option value="" disabled selected>-- 색상 선택 --</option>
                    ${product.options.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
            </div>
        `;
    }

    
    if (product.options && product.options.sizes && product.options.sizes.length > 0) {
        optionsHtml += `
            <div class="option-group">
                <label for="size-select">사이즈 선택:</label>
                <select id="size-select" required>
                    <option value="" disabled selected>-- 사이즈 선택 --</option>
                    ${product.options.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
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
                
                <div class="option-group">
                    <label for="detail-quantity">수량:</label>
                    <input type="number" id="detail-quantity" value="1" min="1" max="99" style="width: 100px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
                </div>
                
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
        const colorSelect = document.getElementById('color-select');
        const sizeSelect = document.getElementById('size-select');
        const quantityInput = document.getElementById('detail-quantity');
        
        const selectedColor = colorSelect ? colorSelect.value : null;
        const selectedSize = sizeSelect ? sizeSelect.value : null;
        const quantity = parseInt(quantityInput.value, 10) || 1; 
        
        
        const requiresColor = product.options && product.options.colors && product.options.colors.length > 0;
        const requiresSize = product.options && product.options.sizes && product.options.sizes.length > 0;

        if (requiresColor && (!selectedColor || selectedColor === '')) {
            alert('색상을 선택해주세요.');
            return;
        }
        if (requiresSize && (!selectedSize || selectedSize === '')) {
            alert('사이즈를 선택해주세요.');
            return;
        }
        if (quantity < 1) {
            alert('수량은 1개 이상이어야 합니다.');
            return;
        }

        addToCart(product.id, selectedColor, selectedSize, quantity); 
        if (productDetailModal) productDetailModal.style.display = 'none';
    });

    if (productDetailModal) productDetailModal.style.display = 'block';
}


function generateOrderId() {
    const now = new Date();
    
    const datePart = now.getFullYear().toString().substring(2) + 
                     (now.getMonth() + 1).toString().padStart(2, '0') + 
                     now.getDate().toString().padStart(2, '0');
    
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    return `ZIP-${datePart}-${randomPart}`;
}

function showLoginForm() {
    if (!modalTitle || !loginForm || !signupForm || !switchToSignupLink || !switchToLoginLink) return;
    modalTitle.textContent = '👤 로그인';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    switchToSignupLink.style.display = 'block';
    switchToLoginLink.style.display = 'none';
}

function showSignupForm() {
    if (!modalTitle || !loginForm || !signupForm || !switchToSignupLink || !switchToLoginLink) return;
    modalTitle.textContent = '✨ 회원가입';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    switchToSignupLink.style.display = 'none';
    switchToLoginLink.style.display = 'block';
}


function handleScrollHeader() {
    if (!header) return;
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); 
    if (heroSection) heroSection.style.display = 'flex'; 
    renderProducts('all');
    handleScrollHeader();
    updateCartDisplay();
    
    
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            if (isLoggedIn) {
                handleLogout();
            } else {
                showLoginForm();
                if (loginModal) loginModal.style.display = 'block';
            }
        });
    }

    if (loginForm && usernameInput) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim() || '회원'; 
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            localStorage.setItem('loggedInUser', username);
            checkLoginStatus(); 
            alert(`${username}님, 환영합니다! (로그인 성공)`);
            if (loginModal) loginModal.style.display = 'none';
            loginForm.reset();
        });
    }

    if (switchToSignupLink) switchToSignupLink.addEventListener('click', (e) => { e.preventDefault(); showSignupForm(); });
    if (switchToLoginLink) switchToLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLoginForm(); });
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPassword = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-password-confirm').value;

            if (newPassword !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            alert(`🎉 회원가입이 완료되었습니다! 로그인해 주세요.`);
            showLoginForm(); 
            signupForm.reset();
        });
    }
    
    
    if (mainLogo && heroSection) {
        mainLogo.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
            const allLink = document.querySelector('.nav-link[data-category="all"]');
            if(allLink) allLink.classList.add('active');
            heroSection.style.display = 'flex';
            renderProducts('all'); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function handleCategoryClick(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-category');
        if (heroSection) heroSection.style.display = category === 'all' ? 'flex' : 'none';
        renderProducts(category || 'all'); 
    }
    navLinks.forEach(link => { link.addEventListener('click', handleCategoryClick); });

    window.addEventListener('scroll', handleScrollHeader);
    
    
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            renderCartModal();
            if (cartModal) cartModal.style.display = 'block'; 
        });
    }

    
    document.querySelectorAll('.close-btn').forEach(button => {
        button.onclick = function() {
            const modalElement = this.closest('.modal'); 
            if (modalElement) modalElement.style.display = 'none';
        }
    });
    
    
    if (couponCheckButton) {
        couponCheckButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (couponModal) couponModal.style.display = 'block';
        });
    }

    
    window.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    
    if (guestCheckoutBtn) {
        guestCheckoutBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            if (cart.length === 0) {
                alert('장바구니에 담긴 상품이 없습니다.');
                return;
            }
            if (cartModal) cartModal.style.display = 'none';
            if (paymentModal) paymentModal.style.display = 'block';
        });
    }

    
    if (loginCheckoutBtn) {
        loginCheckoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (cart.length === 0) {
                alert('장바구니에 담긴 상품이 없습니다.');
                return;
            }
            
            if (isLoggedIn) {
                
                if (cartModal) cartModal.style.display = 'none';
                if (paymentModal) paymentModal.style.display = 'block';
            } else {
                
                alert('회원 혜택(쿠폰, 포인트 적립 등)을 위해 로그인 후 이용해 주세요.'); 
                if (loginModal) {
                    showLoginForm();
                    loginModal.style.display = 'block';
                }
            }
        });
    }
    
    
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const requiredFields = ['input-name', 'input-phone', 'input-address1'];
            let allFilled = true;
            requiredFields.forEach(id => {
                const input = document.getElementById(id);
                if (!input || !input.value.trim()) allFilled = false;
            });

            if (allFilled) {
                if (paymentModal) paymentModal.style.display = 'none';
                
                const userName = document.getElementById('input-name').value.trim();

                
                if (isLoggedIn) {
                    
                    alert(`✅ ${userName}님, 결제가 성공적으로 완료되었습니다. 감사합니다!`);
                } else {
                    
                    const orderId = generateOrderId();
                    alert(`🎉 ${userName}님, 결제가 성공적으로 완료되었습니다!\n\n[주문 번호]: ${orderId}\n\n배송 정보가 정상적으로 접수되었습니다. 감사합니다!`);
                }

                
                cart = [];
                updateLocalStorage();
                updateCartDisplay();
                
                deliveryForm.reset();
            } else {
                alert('⚠️ 필수 입력 항목(이름, 전화번호, 주소)을 모두 입력해 주세요.');
            }
        });
    }
});