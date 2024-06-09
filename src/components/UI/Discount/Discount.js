import React, {useState} from 'react';
import styles from './Discount.module.css';

const Discount = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleClick = () => {
        setIsSubmitted(true);
    };
    return (
        <section className={styles.discount}>
            <h2 className={styles.title}>5% off on the first order</h2>
            <div className={styles.content}>
                <div className={styles.image}></div>
                <form className={styles.form}>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="Name" className={styles.input} />
                        <input type="text" placeholder="Phone number" className={styles.input} />
                        <input type="email" placeholder="Email" className={styles.input} />
                    </div>
                    <button
                        type="button"
                        className={`${styles.button} ${isSubmitted ? styles.submitted : ''}`}
                        onClick={handleClick}
                    >
                        {isSubmitted ? 'Request Submitted' : 'Get a discount'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Discount;
