
export default function Test(){
	return(
        <head>
        <script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
          async
        /> {/* https://nextjs.org/docs/messages/no-sync-scripts */}
        </head>
	);
}
