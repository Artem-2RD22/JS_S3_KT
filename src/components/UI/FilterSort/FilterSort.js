import React from 'react';
import styles from './FilterSort.module.css';

const FilterSort = ({ onPriceChange, onDiscountChange, onSortChange, hideDiscountCheckbox }) => {
    return (
        <div className={styles.filterSort}>
            <div className={styles.filterItem}>
                <label htmlFor="priceFrom">Price</label>
                <input
                    type="text"
                    id="priceFrom"
                    placeholder="from"
                    onChange={(e) => onPriceChange('priceFrom', e.target.value)}
                />
                <input
                    type="text"
                    id="priceTo"
                    placeholder="to"
                    onChange={(e) => onPriceChange('priceTo', e.target.value)}
                />
            </div>
            {!hideDiscountCheckbox && (
                <div className={styles.filterItem}>
                    <label htmlFor="discounted">Discounted items</label>
                    <input
                        type="checkbox"
                        id="discounted"
                        onChange={(e) => onDiscountChange(e.target.checked)}
                    />
                </div>
            )}
            <div className={styles.sortSelect}>
                <label htmlFor="sortBy">Sorted</label>
                <select id="sortBy" onChange={(e) => onSortChange(e.target.value)}>
                    <option value="default">by default</option>
                    <option value="newest">newest</option>
                    <option value="high-low">price: high-low</option>
                    <option value="low-high">price: low-high</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSort;
