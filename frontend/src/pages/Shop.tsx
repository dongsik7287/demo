import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import SignIn from "../components/SignIn";

import { useAuth } from "../hooks/useAuth";
import { usePayments } from "../hooks/usePayments";

const Shop = () => {
  const {
    user,
    isAuthenticated,
    showSignIn,
    signIn,
    signOut,
    closeSignIn,
    requireAuth,
    isAuthLoading: isAuthLoading,
  } = useAuth();

  const { orderProduct, isAuthLoading: isPaymentLoading } = usePayments({
    isAuthenticated,
    onRequireAuth: requireAuth,
  });

  const isLoading = isAuthLoading || isPaymentLoading;

  return (
    <>
      <Header
        user={user}
        onSignIn={signIn}
        onSignOut={signOut}
        isAuthLoading={isAuthLoading}
      />

      {/* 아르카디아 아이템 섹션 */}
      <div style={{ padding: "20px" }}>
        <h1>아르카디아 상점</h1>
        
        <ProductCard
          name="아르카디아의 전설적인 검"
          description="강력한 공격력을 가진 아르카디아의 핵심 아이템입니다."
          price={10} 
          pictureURL="https://via.placeholder.com/150" 
          onClickBuy={() => orderProduct("아르카디아 검 결제", 10, { productId: "arcadia_sword_001" })}
          disabled={isLoading}
        />

        <ProductCard
          name="아르카디아 생명 물약"
          description="체력을 100 회복시켜주는 필수 아이템입니다."
          price={2}
          pictureURL="https://via.placeholder.com/150"
          onClickBuy={() => orderProduct("물약 결제", 2, { productId: "arcadia_potion_001" })}
          disabled={isLoading}
        />
      </div>

      {showSignIn && <SignIn onSignIn={signIn} onModalClose={closeSignIn} disabled={isAuthLoading} />}
    </>
  );
};

export default Shop;
