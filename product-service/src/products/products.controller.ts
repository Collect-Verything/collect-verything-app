import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { StockAndID } from './entities/type';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('all')
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  findAll() {
    return this.productsService.findAll();
  }

  @Get()
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  findAllVisible() {
    return this.productsService.findAllVisible();
  }

  @Get('non-visible')
  @ApiCreatedResponse({ type: ProductEntity, isArray: true })
  findAllNonVisible() {
    return this.productsService.findNonVisible();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch('update-stock')
  @ApiCreatedResponse({ type: StockAndID })
  updateStock(@Body() stockAndIds: StockAndID[]) {
    return this.productsService.updateStock(stockAndIds);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ProductEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
