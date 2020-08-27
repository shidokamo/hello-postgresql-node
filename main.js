import { logger } from './logger';
import { query, getClient } from './db';

logger.info("Send query directly to a pool");
query('SELECT * from id_and_texts WHERE id = $1', [2], (err, res) => {
  if (err) {
    logger.error("Error!");
    logger.error(err);
    return;
  }
  logger.info("Data")
  logger.info(JSON.stringify(res.rows[0]))
});

let i = 2;
getClient((err, client, release) => {
  client.query('SELECT * from id_and_texts WHERE id = $1', [i], (err, res) => {
    if (err) {
      logger.error("Error!");
      logger.error(err);
      return;
    }
    logger.info("Data")
    logger.info(JSON.stringify(res.rows[0]))
  })
});
//for (let i = 0; i < 1000; i++) {
//  getClient().then(
//    client => client.query('SELECT * from id_and_texts WHERE id = $1', [i], (err, res) => {
//      if (err) {
//        logger.error("Error!");
//        logger.error(err);
//        return;
//      }
//      logger.info(JSON.stringify(res.rows[0]))
//    })
//  );
//}
