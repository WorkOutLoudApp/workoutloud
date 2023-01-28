import Homepage from '@src/assets/Homepage.png'
import FooterImg from '@src/assets/FooterImg.png'


const Footer = () => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5">Link 1</p>
          <p className="my-5">Link 2</p>
          <p>Link 3</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">Tempus metus mattis risus volutpat egestas.</p>
          <p>(123)456-7890</p>
        </div>
        <div className="mt-16 basis-1/2 md:mt-0">
          <img src={FooterImg.src} alt='Bottom'/>
          <p className="my-5">
            Lorem vitae ut augue auctor faucibus eget eget ut libero. Elementum
            purus et arcu massa dictum condimentum. Augue scelerisque iaculis
            orci ut habitant laoreet. Iaculis tristique.
          </p>
          <p>© 2023-2024 WorkOutLoud All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
