// rfce
import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'


import GithubLogo from '../images/GithubLogo.png'




function About() {



    return (
        <div className="max-w-auto mx-auto max-w-md mt-8">
            <div className='bg-white text-center rounded-2xl border-8 border-black py-4'>
                <p className='text-2xl'>TU Shop Online</p> <br /><br />
                <p>ผู้จัดทำ</p>
                <p>นายสุเมต คงแก้ว 6216012559</p><br />
                <br />
                <p>อาจารย์ที่ปรึกษา</p>
                <p>อ.ดร. ชุมพล บุญมี</p>
                <br /><br />


                <h1></h1>

                <Link to="https://github.com/boykingkao/TU_Project" target="" rel="noopener noreferrer">
                    <img className="mx-auto hover:cursor-pointer" src={GithubLogo} /></Link>

            </div>
        </div>
    )
}

export default About


