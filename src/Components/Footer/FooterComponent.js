import React from 'react'
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'; // import 'rc-footer/asssets/index.less';

 
export default class FooterComponent extends React.Component{
render(){
    return(
      <div>
      <Footer
        columns={[
          {
            title: 'HELPFUL LINKS',
            items: [
              {
                title: 'WHO',
                url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance',
                openExternal: true,
              },
              {
                title: 'CDC',
                url: 'https://www.cdc.gov/coronavirus/2019-ncov/index.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2Findex.html',
                openExternal: true,
              },
              {
                title: 'STATE HOTLINE NUMBERS',
                url: 'https://www.nbcnews.com/health/health-news/coronavirus-testing-information-covid-19-tests-according-state-health-departments-n1158041',
                openExternal: true,
              },
            ],
          },
          {
            title: 'LIVE TRACKERS',
            items: [
              {
                title: 'JOHNS HOPKINS',
                url: 'https://coronavirus.jhu.edu/map.html',
                openExternal: true,
              },
              {
                title: 'WORLDMETER',
                url: 'https://www.worldometers.info/coronavirus/',
                openExternal: true,
              },
              {
                title: 'TRACKCORONA',
                url: 'https://www.trackcorona.live/',
                openExternal: true,
              },
            ],
          },
          {
            title: "VOLUNTEER",
            items: [
              {
                title: 'LIST OF WAYS TO VOLUNTEER',
                url: 'https://www.foxnews.com/health/how-to-volunteer-during-coronavirus',
                openExternal: true,
              },
              // {
              //   title: 'Ant Design Mobile',
              //   url: 'https://mobile.ant.design/',
              //   openExternal: true,
              // },
            // {
              //   title: 'Kitchen',
              //   url: 'https://kitchen.alipay.com/',
              //   description: 'Sketch 工具集',
              // },
            ],
          },
          {
            icon: (
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                alt="more products"
              />
            ),
            title: 'STEADY',
            items: [
              {
                icon: (
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
                    alt="yuque"
                  />
                ),
                title: 'BUILT TO HELP',
                // url: 'https://yuque.com',
                // description: '知识创作与分享工具',
                openExternal: true,
              },
              // {
              //   icon: (
              //     <img
              //       src="https://gw.alipayobjects.com/zos/rmsportal/uHocHZfNWZOdsRUonZNr.png"
              //       alt="yuque"
              //     />
              //   ),
              //   title: '云凤蝶',
              //   url: 'https://yunfengdie.com',
              //   description: '中台建站平台',
              //   openExternal: true,
              // },
            ],
          },
        ]}
        bottom="Made with ❤️ by STEADY"
      />
    </div>
)
}
}