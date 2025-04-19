import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { StockAndID } from './entities/type';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findAllVisible() {
    return this.prisma.product.findMany({ where: { published: true } });
  }

  findNonVisible() {
    return this.prisma.product.findMany({ where: { published: false } });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async updateStock(stockAndIds: StockAndID[]): Promise<void> {
    await Promise.all(
      stockAndIds.map((item) =>
        this.prisma.product.update({
          where: { id: item.id },
          data: { stock: { decrement: item.quantity } },
        })
      )
    );
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
