import React, { useState, useEffect } from 'react';
import './App.css';
import ClothingList from './ClothingList';

// 导入公司logo
import logo from './images/logo/logo.jpg';

// 导入广告图片
import bigPakes from './images/advs/big-pakes.JPG';
import oneBig from './images/advs/one-big.jpg';
import smallPakes from './images/advs/small-pakes.jpg';

// 广告图片数组
const advImages = [
  bigPakes,
  oneBig,
  smallPakes
];

const App = () => {
  // 状态管理，控制是否显示衣服品类列表
  const [isVisible, setIsVisible] = useState(false);
  // 状态管理，控制是否显示Clothing Store相关信息
  const [showStoreInfo, setShowStoreInfo] = useState(true);
  // 状态管理，控制是否显示广告
  const [showAd, setShowAd] = useState(false);
  // 广告图片索引状态
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  // 窗口宽度状态
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // 切换到下一张广告图片
  const nextAd = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === advImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 使用useEffect钩子在组件挂载5秒后显示ClothingList和广告，并隐藏Clothing Store相关信息
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowStoreInfo(false);
      setShowAd(true);
    }, 5000);

    // 清除定时器
    return () => clearTimeout(timer);
  }, []);

  // 关闭广告的函数
  const closeAd = () => {
    setShowAd(false);
    setIsVisible(true);
    setShowStoreInfo(false);
  };

  // 自动切换广告图片的useEffect
  useEffect(() => {
    let adTimer: ReturnType<typeof setInterval>;
    if (showAd) {
      adTimer = setInterval(nextAd, 3000); // 每3秒切换一次广告
    }

    return () => {
      if (adTimer) {
        clearInterval(adTimer);
      }
    };
  }, [showAd, nextAd]);

  // 根据窗口宽度设置广告图片的样式
  const getAdImageStyle = () => {
    // 移动端
    if (windowWidth < 768) {
      return {
        width: '100%',
        height: 'auto',
        objectFit: 'cover' as const
      };
    }
    // iPad端
    else if (windowWidth < 1024) {
      return {
        width: '100%',
        height: '500px',
        objectFit: 'cover' as const
      };
    }
    // PC端
    else {
      return {
        width: '100%',
        height: '600px',
        objectFit: 'cover' as const
      };
    }
  };

  return (
    <div>
      {showStoreInfo && (
        <div className="content">
          <img src={logo} alt="Company Logo" width="170" height="170" style={{ display: 'block', margin: '0 auto' }} />
          <h1>Clothing Store</h1>
          <p>Welcome to our clothing store</p>
        </div>
      )}
      {showAd && (
        <div className="ad-container" style={{ backgroundColor: 'transparent' }}>
            <img
              src={advImages[currentAdIndex]}
              alt={`Advertisement ${currentAdIndex + 1}`}
              onClick={nextAd}
              style={getAdImageStyle()}
            />
            <button className="close-button" onClick={closeAd}>✕</button>
          </div>
      )}
      <div className={`transition-container ${isVisible ? 'visible' : 'hidden'}`}>
        {isVisible && <ClothingList />}
      </div>
    </div>
  );
};

export default App;
