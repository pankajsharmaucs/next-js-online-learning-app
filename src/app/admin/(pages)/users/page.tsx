import React from 'react'

const page = () => {
  return (
    <main>
      <section className="dashboard__area pt-100 md:pt-[200px] pb-145">
        <div className="container">

          <div className="row">
            <div className="col-xxl-12">
              <div className="section__title-wrapper text-center mb-55">
                <h2 className="section__title">All Users </h2>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12 flex flex-wrap justify-center items-center gap-6 py-24">
              <div className="dashboard__content ">
                <p>Here is where the admin dashboard content will be displayed.</p>
                {/* You can add more components like charts, user data, etc. */}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

export default page